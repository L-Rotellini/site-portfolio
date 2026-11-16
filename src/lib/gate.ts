/* Contrat partagé entre la route /api/gate et le composant LiveGate. */

export const RULE_IDS = ["evals", "human_loop", "cost", "failure"] as const;
export type RuleId = (typeof RULE_IDS)[number];

export const GATE_MAX = 6;
export const INPUT_MAX = 600;

export type GateRule = {
  id: RuleId;
  ok: boolean;
  /** Justification tirée du texte évalué. Vide en mode repli. */
  note: string;
};

export type GateResult = {
  verdict: "PASS" | "FAIL";
  score: number;
  rules: GateRule[];
  /** "claude" = évalué par le modèle, "rules" = repli local. */
  source: "claude" | "rules";
};

/* Moteur de règles local : mots-clés FR + EN. Sert de repli quand la clé API
   est absente, que le quota est atteint ou que l'appel échoue — la démo publique
   ne doit jamais renvoyer une erreur. */
const CHECKS: Record<RuleId, RegExp> = {
  evals: /eval|éval|test|golden|référen|scor|benchmark/i,
  human_loop: /human|humain|review|relectur|valid|révis|contrôl|approv|sign-?off|verif/i,
  cost: /cost|coût|cout|budget|cap|plafon|rate limit|quota|bounded|born|limite|per doc|par doc/i,
  failure: /retr|réessai|ressai|fallback|repli|timeout|error|erreur|graceful|robust|échec|echec|panne/i,
};

/* Négation : « aucun jeu d'évals », « sans relecture », « no evals » ne doivent
   pas satisfaire la règle. Un mot-clé est nié quand une négation le précède de
   près (NEGATION_WINDOW mots) dans la même proposition. Une règle est satisfaite
   dès qu'une de ses occurrences n'est pas niée. */
const NEGATION_WINDOW = 6;
const NEGATORS = new Set([
  "aucun", "aucune", "sans", "ni", "jamais", "no", "without", "not", "never",
]);
/* Maillons d'énumération : une négation porte sur toute la liste (« aucun jeu
   d'évals, de tests ou de benchmark »). Chaque maillon, et chaque virgule restée
   dans la proposition, relance la fenêtre de NEGATION_WINDOW mots. */
const LIST_LINKS = new Set(["ou", "or", "ni", "nor"]);
/* « pas » ne nie que suivi de « de » / « d' », au plus un mot plus loin
   (« pas de tests », « pas encore d'évals »). */
const PAS_OBJECTS = new Set(["de", "d", "des", "du"]);
/* Une négation suivie de ces mots (au plus un mot plus loin) borne au lieu de
   nier : « no more than 3 retries », « pas plus de 0,05 € par doc », « sans
   jamais dépasser le budget ». */
const NEUTRALIZERS = new Set([
  "more", "less", "fewer", "than", "only", "over", "above", "exceed", "exceeding",
  "exceeds", "plus", "moins", "seulement", "dépasser", "dépasse", "dépassent",
  "excéder", "excède",
]);
/* Fin de proposition : ponctuation, ou mot de contraste (« pas d'évals mais une
   relecture »). Une virgule qui prolonge une énumération (« aucun jeu d'évals,
   de tests ou de benchmark ») ne coupe pas. Construit par RegExp : la cible ES2017 du tsconfig refuse
   \p{L} et les lookbehind en littéral. */
const CLAUSE_BREAK = new RegExp(
  String.raw`[.;:!?()[\]\n]|,(?!\s*(?:(?:de|des|du|ou|ni|or|nor)(?!\p{L})|d['’]))|(?<!\p{L})(?:mais|but|however|cependant)(?!\p{L})`,
  "giu",
);
/* Mots, et virgules : une virgule encore présente dans la proposition est un
   maillon d'énumération, puisque les autres virgules ont coupé la proposition. */
const TOKEN = new RegExp(String.raw`[\p{L}\p{N}-]+|,`, "gu");
/* Contractions anglaises : « don't », « isn't », « doesn't » → « … not ». Sans
   cela l'apostrophe coupe en « don » + « t » et la négation disparaît. */
const NT_CONTRACTION = new RegExp(String.raw`n['’]t(?![\p{L}\p{N}])`, "gu");
const ENDS_WITH_LETTER = new RegExp(String.raw`\p{L}$`, "u");

function isNegator(words: string[], i: number): boolean {
  const next = words[i + 1];
  if ((next !== undefined && NEUTRALIZERS.has(next)) || NEUTRALIZERS.has(words[i + 2] ?? "")) {
    return false;
  }
  if (words[i] === "pas") {
    return (
      (next !== undefined && PAS_OBJECTS.has(next)) ||
      (words[i + 2] !== undefined && PAS_OBJECTS.has(words[i + 2]))
    );
  }
  return NEGATORS.has(words[i]);
}

function isNegated(text: string, index: number): boolean {
  const before = text.slice(0, index);
  let start = 0;
  for (const m of before.matchAll(CLAUSE_BREAK)) start = m.index + m[0].length;
  const clause = before.slice(start).toLowerCase().replace(NT_CONTRACTION, " not");
  const words: string[] = [];
  // Indices des mots précédés d'une virgule d'énumération.
  const commaBefore = new Set<number>();
  for (const [token] of clause.matchAll(TOKEN)) {
    if (token === ",") commaBefore.add(words.length);
    else words.push(token);
  }
  // Mot-clé trouvé en milieu de mot (« prévalidation ») : le fragment « pré »
  // appartient au mot-clé lui-même, pas au contexte qui le précède.
  if (ENDS_WITH_LETTER.test(before)) words.pop();

  let nearest = -1;
  let budget = NEGATION_WINDOW;
  for (let i = words.length - 1; i >= 0 && budget > 0; i--) {
    if (isNegator(words, i)) {
      nearest = i;
      break;
    }
    budget--;
    if (LIST_LINKS.has(words[i]) || commaBefore.has(i)) budget = NEGATION_WINDOW;
  }
  if (nearest < 0) return false;

  // Double négation : « aucun export sans relecture » exige la relecture. La
  // négation extérieure doit elle aussi être proche du « sans ».
  if (words[nearest] === "sans" || words[nearest] === "without") {
    for (let i = Math.max(0, nearest - NEGATION_WINDOW); i < nearest; i++) {
      if (words[i] !== "ni" && words[i] !== "sans" && words[i] !== "without" && isNegator(words, i)) {
        return false;
      }
    }
  }
  return true;
}

function satisfies(text: string, check: RegExp): boolean {
  const all = new RegExp(check.source, "giu");
  for (const m of text.matchAll(all)) {
    if (!isNegated(text, m.index)) return true;
  }
  return false;
}

export function ruleEngineGate(text: string): GateResult {
  const rules: GateRule[] = RULE_IDS.map((id) => ({
    id,
    ok: satisfies(text, CHECKS[id]),
    note: "",
  }));
  return { ...scoreOf(rules), rules, source: "rules" };
}

/* Le verdict et le score sont dérivés des règles côté serveur : le modèle juge
   chaque règle, il ne calcule jamais la note lui-même. */
export function scoreOf(rules: GateRule[]): Pick<GateResult, "verdict" | "score"> {
  const ok = rules.filter((r) => r.ok).length;
  return {
    verdict: ok === RULE_IDS.length ? "PASS" : "FAIL",
    score: Math.round((ok / RULE_IDS.length) * 100),
  };
}
