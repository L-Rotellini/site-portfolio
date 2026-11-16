"use client";

import { useRef, useState } from "react";
import { GATE_MAX, INPUT_MAX, type GateResult, type RuleId } from "@/lib/gate";

// Démo du gate d'éval de /ia. Logique et route /api/gate inchangées ; libellés repris de
// l'ancien dictionnaire fr.ts (seul texte de l'ancien site conservé), habillage du style commun.
const T = {
  inputLabel: "Décris une fonctionnalité IA",
  placeholder: "ex. un agent qui rédige des e-mails de remboursement…",
  defaultInput:
    "Un agent qui envoie automatiquement des e-mails de remboursement aux clients. Le prompt est dans l'UI. Livraison vendredi.",
  examples: [
    {
      label: "→ OCR · évals · relecture · coût plafonné · réessais",
      value:
        "Pipeline OCR avec un jeu d'évals de référence, relecture humaine avant export, coût plafonné par document, réessais sur timeout.",
    },
    {
      label: "→ RAG · prompts dans l'UI · sans évals · vendredi",
      value:
        "Chatbot RAG, prompts embarqués dans l'UI, aucun jeu d'évals, aucune relecture, livraison vendredi.",
    },
  ],
  run: "Lancer le gate",
  empty: "Lance le gate pour voir un verdict en direct.",
  loading: "évaluation face au gate…",
  limitReached: "Limite de démonstration atteinte (6 essais). Recharge la page pour relancer.",
  throttled: "Trop d'appels sur la démo en ce moment. Réessaie dans quelques minutes.",
  scoreWord: "score",
  rules: {
    evals: "Evals",
    human_loop: "Relecture humaine",
    cost: "Coût borné",
    failure: "Gestion d'échec",
  } satisfies Record<RuleId, string>,
  notePresent: "présent",
  noteAbsent: "absent",
  rationalePass: "Toutes les règles éliminatoires sont satisfaites : prêt à livrer.",
  rationaleFail: "Une ou plusieurs règles éliminatoires manquent : pas prêt à livrer.",
  srcLive: "claude haiku 4.5 · évalué en direct",
  srcFallback: "moteur de règles · repli hors-ligne",
};

type PanelState =
  | { kind: "empty" }
  | { kind: "loading" }
  | { kind: "limit" }
  | { kind: "throttled" }
  | { kind: "done"; result: GateResult };

export default function LiveGate() {
  const [input, setInput] = useState(T.defaultInput);
  const [panel, setPanel] = useState<PanelState>({ kind: "empty" });
  const [disabled, setDisabled] = useState(false);
  const runs = useRef(0);
  const cooldown = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  async function runGate() {
    const text = (inputRef.current?.value ?? "").trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    if (cooldown.current) return;
    if (runs.current >= GATE_MAX) {
      setPanel({ kind: "limit" });
      setDisabled(true);
      return;
    }
    runs.current++;
    cooldown.current = true;
    setDisabled(true);
    setPanel({ kind: "loading" });

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: text.slice(0, INPUT_MAX), locale: "fr" }),
      });
      if (res.status === 429) {
        setPanel({ kind: "throttled" });
      } else if (!res.ok) {
        throw new Error(String(res.status));
      } else {
        setPanel({ kind: "done", result: (await res.json()) as GateResult });
      }
    } catch {
      setPanel({ kind: "throttled" });
    } finally {
      cooldown.current = false;
      if (runs.current < GATE_MAX) setDisabled(false);
    }
  }

  const pass = panel.kind === "done" && panel.result.verdict === "PASS";

  return (
    <div className="gate">
      <div>
        <label htmlFor="gate-input">{T.inputLabel}</label>
        <textarea
          id="gate-input"
          ref={inputRef}
          placeholder={T.placeholder}
          value={input}
          maxLength={INPUT_MAX}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="gate__ex">
          {T.examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setInput(ex.value);
                inputRef.current?.focus();
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
        <button type="button" className="btn gate__run" onClick={() => void runGate()} disabled={disabled}>
          {T.run}
        </button>
      </div>
      <div className="gate__out" aria-live="polite">
        {panel.kind === "empty" && <p className="gate__msg">{T.empty}</p>}
        {panel.kind === "loading" && <p className="gate__msg">{T.loading}</p>}
        {panel.kind === "limit" && <p className="gate__msg">{T.limitReached}</p>}
        {panel.kind === "throttled" && <p className="gate__msg">{T.throttled}</p>}
        {panel.kind === "done" && (
          <>
            <p className="gate__verdict">
              <strong>{panel.result.verdict}</strong>
              <span>
                {T.scoreWord} {panel.result.score}
              </span>
            </p>
            <ul className="gate__rules">
              {panel.result.rules.map((r) => (
                <li key={r.id}>
                  <span>{r.ok ? "✓" : "✕"}</span>
                  <b>{T.rules[r.id]}</b>
                  <small>{r.note || (r.ok ? T.notePresent : T.noteAbsent)}</small>
                </li>
              ))}
            </ul>
            <p className="gate__rat">{pass ? T.rationalePass : T.rationaleFail}</p>
            <p className="gate__src">{panel.result.source === "claude" ? T.srcLive : T.srcFallback}</p>
          </>
        )}
      </div>
    </div>
  );
}
