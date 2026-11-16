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
const NEGATORS = new Set(["aucun", "aucune", "sans", "ni", "no", "without", "not"]);
/* « pas » ne nie que suivi de « de » / « d' », au plus un mot plus loin
   (« pas de tests », « pas encore d'évals »). */
const PAS_OBJECTS = new Set(["de", "d", "des", "du"]);
/* Une négation suivie de ces mots borne au lieu de nier : « no more than 3
   retries », « pas plus de 0,05 € par doc », « sans dépasser le budget ». */
const NEUTRALIZERS = new Set([
  "more", "less", "fewer", "than", "only", "over", "above", "exceed", "exceeding",
  "plus", "moins", "seulement", "dépasser", "excéder",
]);
/* Fin de proposition : ponctuation, ou mot de contraste (« pas d'évals mais une
   relecture »). Construit par RegExp : la cible ES2017 du tsconfig refuse
   \p{L} et les lookbehind en littéral. */
const CLAUSE_BREAK = new RegExp(
  String.raw`[.,;:!?()[\]\n]|(?<!\p{L})(?:mais|but|however|cependant)(?!\p{L})`,
  "giu",
);
const WORD_SPLIT = new RegExp(String.raw`[^\p{L}\p{N}-]+`, "u");
const ENDS_WITH_LETTER = new RegExp(String.raw`\p{L}$`, "u");

function isNegator(words: string[], i: number): boolean {
  const next = words[i + 1];
  if (next !== undefined && NEUTRALIZERS.has(next)) return false;
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
  const words = before.slice(start).toLowerCase().split(WORD_SPLIT).filter(Boolean);
  // Mot-clé trouvé en milieu de mot (« prévalidation ») : le fragment « pré »
  // appartient au mot-clé lui-même, pas au contexte qui le précède.
  if (ENDS_WITH_LETTER.test(before)) words.pop();

  let nearest = -1;
  for (let i = words.length - 1; i >= Math.max(0, words.length - NEGATION_WINDOW); i--) {
    if (isNegator(words, i)) {
      nearest = i;
      break;
    }
  }
  if (nearest < 0) return false;

  // Double négation : « aucun export sans relecture » exige la relecture.
  if (words[nearest] === "sans" || words[nearest] === "without") {
    for (let i = 0; i < nearest; i++) {
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
