// Produits IA : source de vérité FR (copy finale du handoff design 2026).
// Les métriques viennent d'audits de code réels : ne pas les gonfler.

export type ProductStatus = "shipped" | "prototype" | "concept";

export type Product = {
  id: string;
  name: string;
  domain: string;
  status: ProductStatus;
  statusLabel: string;
  one: string;
  stack: string[];
  live: boolean;
  url?: string;
  problem: string;
  approach: string;
  outcome: string;
  ops?: string;
  kpi?: string;
  focus?: string;
  metric: string;
  image: { src: string; alt: string };
};

export const products: Product[] = [
  {
    id: "doctap",
    name: "DocTap",
    domain: "Santé · Docs",
    status: "shipped",
    statusLabel: "En prod publique",
    one: "PWA mobile qui transforme des photos de documents en PDF propres, prêts à imprimer.",
    stack: ["Next.js 14", "TypeScript", "Zustand", "IndexedDB", "pdf-lib", "Mistral vision", "PWA"],
    live: true,
    url: "https://doctap.app",
    problem:
      "Numériser un document depuis un mobile, sans app native ni serveur lourd, y compris des documents sensibles (contexte santé à domicile à l'origine).",
    approach:
      "Deux pipelines. Mode Photos : photos et PDF traités sur l'appareil, aucune photo ni aucun document envoyé. Mode IA : des copies compressées des photos partent chez Mistral pour la transcription, qui en conserve entrées et sorties 30 jours contre les abus ; le texte vérifié part au serveur de DocTap pour la mise en page du PDF, sans y être stocké.",
    outcome:
      "Conçu et mis en production en autonomie. Confidentialité par conception : refus délibéré d'un coffre patient nominatif pour éviter les contraintes HDS.",
    ops:
      "Vérification humaine obligatoire avant tout export ou partage. Récents conservés sur l'appareil 7, 30 ou 90 jours au choix, effacés à l'ouverture de l'app une fois le délai passé. Zéro stockage serveur (aucune base, aucun bucket), vérifié dans le code.",
    kpi: "Assemblage PDF quasi instantané, entièrement sur l'appareil · ~87 Ko de JS partagé.",
    metric: "En production · doctap.app",
    image: { src: "/projects/doctap-desktop.jpg", alt: "DocTap : capture de documents et assemblage PDF sur mobile" },
  },
  {
    id: "horizon",
    name: "Horizon",
    domain: "Connaissance",
    status: "prototype",
    statusLabel: "MVP fonctionnel",
    one: "Hub de connaissance personnel : chat multi-agents sur une base de fiches commune.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Postgres · RLS", "Anthropic SDK"],
    live: false,
    problem:
      "Interroger une connaissance personnelle via des agents spécialisés, sans laisser le modèle corrompre la base.",
    approach:
      "4 agents spécialisés, routage par LLM à chaque message : un routeur classe la requête et l'assigne au bon agent. RAG sur pgvector (embeddings Voyage, recherche cosine), périmètre de fiches borné par agent.",
    outcome: "Fiabilité par l'architecture : l'IA propose, l'humain tranche. Garanti au niveau du code.",
    ops:
      "Clé API strictement côté serveur, jamais exposée au navigateur. Accès base protégé par Row Level Security (RLS) ; le client navigateur n'utilise que la clé anonyme. Zéro écriture automatique dans la base de connaissance : l'IA ne peut que proposer, l'écriture n'a lieu qu'après validation humaine explicite (garanti par conception : les outils du modèle sont incapables d'écrire).",
    kpi: "4 agents · routage LLM à chaque message · RAG pgvector 512d, index HNSW.",
    metric: "MVP fonctionnel",
    image: { src: "/projects/horizon-desktop.jpg", alt: "Horizon : chat multi-agents sur une base de connaissance" },
  },
  {
    id: "relancia",
    name: "RelancIA",
    domain: "PME · Finance",
    status: "prototype",
    statusLabel: "Prototype · en ligne",
    one: "Agent de relance de factures personnalisée, dans la voix propre du commercial.",
    stack: ["Next.js", "React", "TypeScript", "API Mistral"],
    live: true,
    url: "https://relanc-ia.vercel.app",
    problem:
      "Relancer une facture impayée sans casser la relation : une relance générique sonne faux.",
    approach:
      "Apprend le ton à partir d'exemples fournis par l'utilisateur, puis génère dans sa voix. Objet et corps entièrement éditables avant tout envoi.",
    outcome:
      "Prototype testé avec un premier utilisateur réel (client anonymisé). API Mistral (acteur européen), choisie pour rester dans un cadre RGPD-friendly.",
    ops:
      "Zéro envoi automatique, aucune intégration SMTP dans le code : l'app prépare un brouillon, l'utilisateur relit et envoie lui-même depuis son webmail. Human-in-the-loop garanti.",
    kpi: "Zéro envoi automatique : aucune capacité d'envoi dans le code.",
    metric: "En ligne · testé en réel",
    image: { src: "/projects/relancia-desktop.jpg", alt: "RelancIA : éditeur de relance de facture personnalisée" },
  },
  {
    id: "scoring",
    name: "Moteur de scoring",
    domain: "R&D",
    status: "prototype",
    statusLabel: "Projet privé · R&D",
    one: "Scoring reproductible d'items contre des règles d'évaluation définies.",
    stack: ["n8n", "Claude", "Airtable"],
    live: false,
    problem:
      "Un LLM nuance par défaut et évite de trancher : difficile d'en tirer un jugement fiable et reproductible.",
    approach:
      "Des règles fermes et éliminatoires imposées au modèle comme grille d'évaluation, itérées jusqu'à ce que le classement corresponde exactement au jugement attendu.",
    outcome:
      "La fiabilité vient des règles, pas du modèle. Mon différenciant, appliqué. Construit en no-code assumé.",
    metric: "Fiabilité par les règles",
    image: { src: "/projects/assistant-tri-offres-desktop.jpg", alt: "Moteur de scoring : grille d'évaluation d'items dans Airtable" },
  },
];
