// Tests du moteur de règles de repli : npm test (node --test, sans dépendance).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ruleEngineGate } from "./gate.ts";

const OCR =
  "Pipeline OCR avec un jeu d'évals de référence, relecture humaine avant export, coût plafonné par document, réessais sur timeout.";
const RAG =
  "Chatbot RAG, prompts embarqués dans l'UI, aucun jeu d'évals, aucune relecture, livraison vendredi.";

const okOf = (text) =>
  Object.fromEntries(ruleEngineGate(text).rules.map((r) => [r.id, r.ok]));

test("les exemples testés sont bien ceux de LiveGate", () => {
  const src = readFileSync(new URL("../components/LiveGate.tsx", import.meta.url), "utf8");
  assert.ok(src.includes(OCR), "exemple OCR absent de LiveGate.tsx");
  assert.ok(src.includes(RAG), "exemple RAG absent de LiveGate.tsx");
});

test("exemple OCR : PASS 100", () => {
  const r = ruleEngineGate(OCR);
  assert.equal(r.verdict, "PASS");
  assert.equal(r.score, 100);
  assert.equal(r.source, "rules");
});

test("exemple RAG : FAIL, évals et relecture absentes", () => {
  const r = ruleEngineGate(RAG);
  assert.equal(r.verdict, "FAIL");
  const ok = okOf(RAG);
  assert.equal(ok.evals, false);
  assert.equal(ok.human_loop, false);
});

test("négations françaises et anglaises", () => {
  for (const text of [
    "sans évals",
    "pas de tests",
    "pas d'évals",
    "pas encore de benchmark",
    "ni évals ni golden set",
    "no evals",
    "without any golden set",
    "not tested",
    "sans aucun jeu de tests de référence",
    "aucun jeu d'évals, de tests",
  ]) {
    assert.equal(okOf(text).evals, false, text);
  }
});

test("une occurrence non niée suffit", () => {
  assert.equal(okOf("Pas de prompt dans l'UI, jeu d'évals de 200 cas").evals, true);
  assert.equal(okOf("pas d'évals mais une relecture humaine").human_loop, true);
  assert.equal(okOf("no evals yet, human review before send").human_loop, true);
});

test("double négation et bornes ne nient pas", () => {
  assert.equal(okOf("aucun export sans relecture humaine").human_loop, true);
  assert.equal(okOf("no email is sent without human approval").human_loop, true);
  assert.equal(okOf("no more than $0.05 per doc").cost, true);
  assert.equal(okOf("pas plus de 0,05 € par doc").cost, true);
  assert.equal(okOf("réessais sans jamais dépasser le budget").cost, true);
  assert.equal(okOf("no-code pipeline with evals").evals, true);
});

test("une négation lointaine ne crée pas de double négation", () => {
  assert.equal(
    okOf("Aucun prompt dans l'UI pour l'instant et livraison vendredi sans évals").evals,
    false,
  );
});

test("« jamais » et « never » nient", () => {
  assert.equal(okOf("on ne fait jamais de relecture").human_loop, false);
  assert.equal(okOf("les sorties ne sont jamais validées").human_loop, false);
  assert.equal(okOf("we never run evals").evals, false);
  assert.equal(okOf("outputs are never reviewed").human_loop, false);
});

test("« jamais » et « never » bornent ou se combinent sans nier", () => {
  assert.equal(okOf("sans jamais dépasser le budget").cost, true);
  assert.equal(okOf("jamais plus de 0,05 € par doc").cost, true);
  assert.equal(okOf("never exceeds the budget").cost, true);
  assert.equal(okOf("on ne livre jamais sans relecture humaine").human_loop, true);
  assert.equal(okOf("we never ship without human review").human_loop, true);
  // Le verbe est nié, pas un complément circonstanciel qui le suit.
  assert.equal(okOf("never fails silently thanks to retries").failure, true);
  assert.equal(okOf("le pipeline ne plante jamais grâce aux réessais").failure, true);
});

test("contractions anglaises en n't", () => {
  assert.equal(okOf("we don't have evals").evals, false);
  assert.equal(okOf("there isn't any human review").human_loop, false);
  assert.equal(okOf("it doesn't have a golden set").evals, false);
  assert.equal(okOf("we haven’t tested it").evals, false);
  assert.equal(okOf("we don't ship without human review").human_loop, true);
  assert.equal(okOf("don't exceed the budget").cost, true);
});

test("la négation couvre toute une énumération", () => {
  for (const text of [
    "aucun jeu d'évals, de tests ou de benchmark",
    "pas de jeu d'évals annoté, de tests unitaires ou de benchmark",
    "sans jeu de données annoté ni golden set ni benchmark",
    "no labelled dataset for the pipeline or benchmark",
  ]) {
    assert.equal(okOf(text).evals, false, text);
  }
  // Une coordination après la liste ne prolonge pas la négation.
  assert.equal(okOf("aucun prompt en dur ou en clair et tests sur 200 cas").evals, true);
  assert.equal(okOf("sans prompt dans l'UI, ou avec relecture humaine").human_loop, true);
  // Une virgule qui ouvre une nouvelle proposition coupe toujours la négation.
  assert.equal(
    okOf("aucun prompt dans l'interface utilisateur du produit, benchmark sur 200 cas").evals,
    true,
  );
});

test("forme du résultat inchangée", () => {
  const r = ruleEngineGate(RAG);
  assert.deepEqual(Object.keys(r).sort(), ["rules", "score", "source", "verdict"]);
  assert.deepEqual(r.rules.map((x) => x.id), ["evals", "human_loop", "cost", "failure"]);
  for (const rule of r.rules) assert.equal(rule.note, "");
});
