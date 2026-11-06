// Dictionnaire FR : source de vérité de la forme `Dictionary`.
// Copy du handoff design « AI Product Engineer 2026 », typo ajustée (sans tirets cadratins).
// en.ts doit satisfaire ce même type.

export const fr = {
  nav: {
    homeAria: "Louis Rotellini, accueil",
    brandRole: "AI Product Engineer",
    skip: "Aller au contenu",
    links: {
      work: "Produits",
      live: "Live",
      machine: "Machine",
      approach: "Approche",
      about: "Parcours",
      contact: "Contact",
    },
    agentView: "Vue agent",
    agentQuit: "Quitter",
    agentAria: "Basculer la vue agent",
    paletteAria: "Ouvrir la palette de commandes",
    menuAria: "Ouvrir le menu",
    mobileNav: "Navigation mobile",
    search: "Recherche",
    legal: "Mentions légales",
    switchLabel: "EN",
    switchAria: "Switch to English",
  },

  agentBanner: {
    title: "VUE AGENT",
    text: "· comment une machine lit cette page. Les étiquettes pointillées exposent la structure sémantique.",
    exit: "Quitter →",
  },

  hero: {
    eyebrow: "Louis Rotellini · AI Product Engineer",
    h1: {
      pre: "Je conçois et mets en production des ",
      accent: "outils IA",
      post: " pour des usages métier concrets.",
    },
  },

  work: {
    num: "01",
    label: "Produits",
    title: "Mes produits IA, de l'idée à la production.",
    intro:
      "Quatre produits construits en pilotant l'IA. Le LLM est choisi selon le besoin : souvent Mistral pour la conformité européenne. Claude Code me sert à piloter le développement. Filtre par stade, ouvre une fiche.",
    filters: {
      all: "Tous",
      shipped: "En prod",
      prototype: "Prototype",
      concept: "Cadrage",
    },
    cardOpenAria: "Ouvrir",
    cardSee: "voir →",
    cardDetail: "détail →",
    drawer: {
      sheet: "Fiche",
      close: "Fermer",
      problem: "Problème",
      approach: "Approche",
      angle: "Angle",
      ops: "Fiabilité en prod",
      metric: "Métrique",
      open: "Ouvrir",
      noLive: "Privé · pas de démo publique",
      ariaLabel: "Détail produit",
    },
  },

  live: {
    num: "02",
    label: "Démo live · gate d'éval",
    title: "Un gate d'éval, avant la prod.",
    intro:
      "Décris une fonctionnalité IA : un modèle la juge en direct contre quatre règles fermes et éliminatoires. Chaque règle revient avec sa justification, et ce qu'il faudrait ajouter quand elle échoue. Mon différenciant, la fiabilité par les règles, rendu jouable.",
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
    note: "Gate d'éval : évals · relecture humaine · coût borné · gestion d'échec. Claude Haiku 4.5 juge chaque règle, le verdict reste calculé côté serveur. La démo est elle-même plafonnée : 6 essais, 600 caractères.",
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
    },
    notePresent: "présent",
    noteAbsent: "absent",
    rationalePass: "Toutes les règles éliminatoires sont satisfaites : prêt à livrer.",
    rationaleFail: "Une ou plusieurs règles éliminatoires manquent : pas prêt à livrer.",
    srcLive: "claude haiku 4.5 · évalué en direct",
    srcFallback: "moteur de règles · repli hors-ligne",
  },

  machine: {
    num: "03",
    label: "Expérience machine",
    title: "Fait pour les humains, et les machines.",
    intro:
      "En 2026, les agents lisent ton site autant que les humains. Le même contenu, structuré pour qu'un LLM le lise sans deviner. Change de vue.",
    toggleAria: "Mode d'affichage",
    toggleHuman: "Vue humaine",
    toggleMachine: "Vue machine",
    panelTitle: "profile.card",
    humanName: "Louis Rotellini",
    humanRole: "AI Product Engineer · Full-Stack · Next.js · TypeScript · Node",
    humanBio:
      "Conçoit et livre des produits IA de bout en bout : du cadrage au choix du modèle, aux évals, à l'UX et à la production. Je pilote l'IA, je ne la subis pas.",
    tags: ["next.js", "typescript", "llm", "rag", "mistral"],
    jsonScopingKey: "cadrage",
  },

  manifesto: {
    line1: "La génération se délègue.",
    line2: "Le jugement, jamais.",
  },

  approach: {
    num: "04",
    label: "Approche",
    title: "Rendre fiable un système faillible.",
    intro:
      "Un système à base de LLM est probabiliste, donc faillible. Mon métier, c'est de le mettre en prod quand même, sans jamais lui faire confiance en aveugle.",
    principles: [
      {
        t: "Une cible mesurable, pas une feature",
        x: "Je ne pars jamais de « ajouter de l'IA », mais d'une cible : un temps à réduire, un coût par tâche à plafonner, un taux de succès à tenir. Le besoin métier d'abord, le choix du modèle après. Souvent Mistral pour rester en Europe, parfois pas d'IA du tout si une règle suffit.",
      },
      {
        t: "Tracer la frontière déterministe / probabiliste",
        x: "Le geste central du métier : décider où une règle dure s'impose et où le modèle peut trancher. DocTap a deux pipelines. Un mode Photos où aucune photo ni aucun document ne quitte l'appareil, et un mode IA avec OCR puis vérification humaine avant export. J'ai refusé délibérément un coffre patient nominatif pour rester hors du périmètre HDS.",
      },
      {
        t: "La fiabilité vient des règles et des évals",
        x: "Un LLM nuance par défaut ; pour un jugement reproductible, je lui impose des règles fermes et éliminatoires. C'est le principe de mon moteur de scoring. La démo live de ce site rend ça jouable : un gate d'éval qui score une fonctionnalité contre ces règles avant la prod.",
      },
      {
        t: "Diriger l'IA, garder la décision",
        x: "Je dirige l'implémentation avec des limites strictes : types, schémas, revue. Je ne relis pas le code à la main : je lance des audits assistés par l'IA pour débusquer les failles, contre-audités par un second agent quand l'enjeu le justifie. Sur un build récent, ça a rattrapé une route d'API laissée exposée avant la prod. La détection se délègue ; ce qui part en prod, c'est moi qui le tranche.",
      },
    ],
  },

  about: {
    num: "05",
    label: "Parcours",
    bio1: "~10 ans de web. J'ai commencé par l'intégration, puis le front-end React / Next.js / TypeScript. Aujourd'hui Développeur Front-end, je construis des produits en pilotant l'IA, de l'idée à la production.",
    bio2: "Un vrai parcours de dev devenu builder AI-augmenté, pas un reconverti no-code. C'est ce qui me permet de diriger l'IA au lieu de la subir, et d'auditer ce qu'elle produit.",
    clientsLabel: "Clients",
    clientsNote: "· missions freelance · intégration front-end",
    portraitAlt: "Louis Rotellini",
  },

  contact: {
    num: "06",
    label: "Contact",
    title: "Construisons quelque chose.",
    emailKey: "Email",
    emailCopyHint: "copier ⧉",
    emailCopyAria: "Copier l'e-mail",
    copied: "E-mail copié",
    githubKey: "GitHub",
    linkedinKey: "LinkedIn",
    newTab: "(nouvel onglet)",
  },

  footer: {
    rights: "© 2026 Louis Rotellini",
    legal: "Mentions légales",
    madeFor: "Fait pour les humains & les machines",
    soundOff: "Son off",
    soundOn: "Son on",
    accentAria: "Accent",
    accents: { cobalt: "Cobalt", orange: "Orange", green: "Vert", violet: "Violet" },
    themeAria: "Thème",
    themeLight: "Clair",
    themeDark: "Sombre",
  },

  palette: {
    placeholder: "Aller à une section, ou lancer une action…",
    inputAria: "Commande",
    dialogAria: "Palette de commandes",
    groupGoto: "Aller à",
    groupActions: "Actions",
    gotoTop: "Haut de page",
    gotoWork: "Produits",
    gotoLive: "Démo live",
    gotoMachine: "Humain / Machine",
    gotoApproach: "Approche",
    gotoAbout: "Parcours",
    gotoContact: "Contact",
    actAgent: "Vue agent",
    actGate: "Lancer le gate live",
    actEmail: "Copier l'e-mail",
    actGithub: "GitHub",
    actLinkedin: "LinkedIn",
    actLegal: "Mentions légales",
    actLang: "English version",
    empty: "Aucun résultat",
    footNav: "naviguer",
    footOpen: "ouvrir",
    footClose: "fermer",
  },

  notFound: {
    metaTitle: "Page introuvable",
    eyebrow: "Route introuvable · Erreur",
    body: "Cette page n'existe pas, ou plus. Tu peux revenir à l'accueil, ou m'écrire si tu cherchais quelque chose en particulier.",
    backHome: "Retour à l'accueil",
    emailCta: "Écrire un email",
  },

  legal: {
    metaTitle: "Mentions légales",
    metaDescription:
      "Informations légales relatives au site louisrotellini.fr, conformément à la loi pour la confiance dans l'économie numérique.",
    eyebrow: "Mentions légales",
    back: "← Retour au portfolio",
    title: "Mentions légales.",
    intro:
      "Informations légales relatives au site louisrotellini.fr, conformément à la loi pour la confiance dans l'économie numérique.",
    publisherTitle: "Éditeur",
    publisherRole: "Louis Rotellini, AI Product Engineer.",
    publisherLocation: "Lille / Paris, France.",
    contactPrefix: "Contact : ",
    hostTitle: "Hébergeur",
    hostBody: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    ipTitle: "Propriété intellectuelle",
    ipBody:
      "L'ensemble des contenus présents sur ce site (textes, code, images, structure) est protégé par le droit d'auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.",
    dataTitle: "Données personnelles",
    dataBody:
      "Ce site n'utilise aucun cookie tiers à des fins publicitaires. Les statistiques de visite sont collectées via Vercel Web Analytics, anonymement et sans transfert hors UE.",
    dataBullets: [
      "Aucune création de profil utilisateur",
      "Aucun cookie publicitaire",
      "Données anonymisées, conservées 30 jours",
    ],
    contactTitle: "Contact",
    contactBody:
      "Pour toute question relative aux mentions légales ou à la protection des données : ",
    lastUpdate: "Dernière mise à jour · Juillet 2026",
    homeLink: "Accueil",
  },

  mail: {
    subject: "Prise de contact",
    body: `Bonjour Louis,

Je vous contacte suite à la consultation de votre portfolio.

Merci !`,
  },

  meta: {
    title: "Louis Rotellini · AI Product Engineer",
    description:
      "AI Product Engineer à Lille. Je conçois et mets en production des outils IA pour des usages métier concrets : Next.js, TypeScript, agents, RAG. La fiabilité vient des règles, des évals et du jugement.",
    keywords: [
      "AI Product Engineer",
      "AI Engineer",
      "Product Engineer",
      "outils IA",
      "produits IA",
      "piloter l'IA",
      "agents IA",
      "Claude Code",
      "gate d'éval",
      "intégration LLM",
      "Mistral",
      "Next.js",
      "TypeScript",
      "React",
      "RAG",
      "Lille",
      "Paris",
    ],
    ogTitle: "AI Product Engineer · Je conçois et mets en production des outils IA pour des usages métier concrets",
    ogImageAlt: "Portfolio de Louis Rotellini : AI Product Engineer · outils IA en production",
    jobTitle: "AI Product Engineer",
    personDescription:
      "AI Product Engineer à Lille. Je conçois et mets en production des outils IA pour des usages métier concrets : Next.js, TypeScript, agents, RAG. Fiabilité par les règles et les évals.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Claude Code",
      "Agents IA",
      "RAG",
      "Évals LLM",
      "MCP",
      "Mistral",
      "Intégration LLM",
      "Construction de produits en pilotant l'IA",
    ],
    serviceName: "Louis Rotellini · AI Product Engineer",
    serviceDescription:
      "Conception et mise en production d'outils IA pour des usages métier concrets (Next.js, TypeScript, agents, RAG), avec un workflow piloté par Claude Code.",
    serviceTypes: [
      "Conception et mise en production d'outils IA",
      "Pilotage Claude Code",
      "Intégration LLM",
      "Développement front-end React / Next.js / TypeScript",
    ],
    consoleTitle: "Louis Rotellini, AI Product Engineer",
    consolePortfolio: "Portfolio : https://www.louisrotellini.fr",
    consoleSpecialties: "Spécialités : outils IA en prod · évals · Next.js · TypeScript",
  },
};

export type Dictionary = typeof fr;

export default fr;
