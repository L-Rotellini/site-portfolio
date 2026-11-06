// EN dictionary: must satisfy the `Dictionary` type defined by fr.ts.

import type { Dictionary } from "./fr";

export const en: Dictionary = {
  nav: {
    homeAria: "Louis Rotellini, home",
    brandRole: "AI Product Engineer",
    skip: "Skip to content",
    links: {
      work: "Products",
      live: "Live",
      machine: "Machine",
      approach: "Approach",
      about: "Background",
      contact: "Contact",
    },
    agentView: "Agent view",
    agentQuit: "Exit",
    agentAria: "Toggle agent view",
    paletteAria: "Open the command palette",
    menuAria: "Open the menu",
    mobileNav: "Mobile navigation",
    search: "Search",
    legal: "Legal notice",
    switchLabel: "FR",
    switchAria: "Passer en français",
  },

  agentBanner: {
    title: "AGENT VIEW",
    text: "· how a machine reads this page. The dashed labels expose the semantic structure.",
    exit: "Exit →",
  },

  hero: {
    eyebrow: "Louis Rotellini · AI Product Engineer",
    h1: {
      pre: "I design and ship ",
      accent: "AI tools",
      post: " for concrete business use cases.",
    },
  },

  work: {
    num: "01",
    label: "Products",
    title: "My AI products, from idea to production.",
    intro:
      "Four products built by piloting AI. The LLM is chosen per need: often Mistral for European compliance. Claude Code is how I drive development. Filter by stage, open a card.",
    filters: {
      all: "All",
      shipped: "Shipped",
      prototype: "Prototype",
      concept: "Scoping",
    },
    cardOpenAria: "Open",
    cardSee: "view →",
    cardDetail: "details →",
    drawer: {
      sheet: "Case",
      close: "Close",
      problem: "Problem",
      approach: "Approach",
      angle: "Angle",
      ops: "Reliability in prod",
      metric: "Metric",
      open: "Open",
      noLive: "Private · no public demo",
      ariaLabel: "Product details",
    },
  },

  live: {
    num: "02",
    label: "Live demo · eval gate",
    title: "An eval gate, before production.",
    intro:
      "Describe an AI feature: a model judges it live against four hard, eliminatory rules. Every rule comes back with its reasoning, and with what you would need to add when it fails. My differentiator, reliability through rules, made playable.",
    inputLabel: "Describe an AI feature",
    placeholder: "e.g. an agent that writes refund emails…",
    defaultInput:
      "An agent that automatically sends refund emails to customers. The prompt lives in the UI. Shipping Friday.",
    examples: [
      {
        label: "→ OCR · evals · review · capped cost · retries",
        value:
          "OCR pipeline with a golden eval set, human review before export, cost capped per document, retries on timeout.",
      },
      {
        label: "→ RAG · prompts in the UI · no evals · Friday",
        value:
          "RAG chatbot, prompts embedded in the UI, no eval set, no review, shipping Friday.",
      },
    ],
    run: "Run the gate",
    note: "Eval gate: evals · human review · bounded cost · failure handling. Claude Haiku 4.5 judges each rule, the verdict is still computed server-side. The demo itself is capped: 6 runs, 600 characters.",
    empty: "Run the gate to see a live verdict.",
    loading: "evaluating against the gate…",
    limitReached: "Demo limit reached (6 runs). Reload the page to start over.",
    throttled: "Too many calls on the demo right now. Try again in a few minutes.",
    scoreWord: "score",
    rules: {
      evals: "Evals",
      human_loop: "Human review",
      cost: "Bounded cost",
      failure: "Failure handling",
    },
    notePresent: "present",
    noteAbsent: "missing",
    rationalePass: "All eliminatory rules are satisfied: ready to ship.",
    rationaleFail: "One or more eliminatory rules are missing: not ready to ship.",
    srcLive: "claude haiku 4.5 · judged live",
    srcFallback: "rule engine · offline fallback",
  },

  machine: {
    num: "03",
    label: "Machine experience",
    title: "Built for humans, and machines.",
    intro:
      "In 2026, agents read your site as much as humans do. The same content, structured so an LLM can read it without guessing. Switch views.",
    toggleAria: "Display mode",
    toggleHuman: "Human view",
    toggleMachine: "Machine view",
    panelTitle: "profile.card",
    humanName: "Louis Rotellini",
    humanRole: "AI Product Engineer · Full-Stack · Next.js · TypeScript · Node",
    humanBio:
      "Designs and ships AI products end to end: from scoping to model choice, evals, UX and production. I pilot AI; it doesn't pilot me.",
    tags: ["next.js", "typescript", "llm", "rag", "mistral"],
    jsonScopingKey: "scoping",
  },

  manifesto: {
    line1: "Generation can be delegated.",
    line2: "Judgment, never.",
  },

  approach: {
    num: "04",
    label: "Approach",
    title: "Making a fallible system reliable.",
    intro:
      "An LLM-based system is probabilistic, therefore fallible. My job is to ship it to production anyway, without ever trusting it blindly.",
    principles: [
      {
        t: "A measurable target, not a feature",
        x: "I never start from “add AI”, but from a target: a time to cut, a cost per task to cap, a success rate to hold. Business need first, model choice after. Often Mistral to stay in Europe, sometimes no AI at all if a rule is enough.",
      },
      {
        t: "Drawing the deterministic / probabilistic boundary",
        x: "The core move of the craft: deciding where a hard rule must apply and where the model may decide. DocTap has two pipelines. A Photos mode where no photo or document leaves the device, and an AI mode with OCR followed by human verification before export. I deliberately refused a named patient vault to stay out of the French HDS health-data scope.",
      },
      {
        t: "Reliability comes from rules and evals",
        x: "An LLM hedges by default; for a reproducible judgment I impose hard, eliminatory rules on it. That's the principle behind my scoring engine. This site's live demo makes it playable: an eval gate that scores a feature against those rules before production.",
      },
      {
        t: "Directing AI, keeping the decision",
        x: "I direct the implementation within strict limits: types, schemas, review. I don't re-read the code by hand: I run AI-assisted audits to flush out flaws, counter-audited by a second agent when the stakes warrant it. On a recent build, that caught an API route left exposed before production. Detection can be delegated; what ships to production is my call.",
      },
    ],
  },

  about: {
    num: "05",
    label: "Background",
    bio1: "~10 years of web. I started in integration, then React / Next.js / TypeScript front-end. Now a Front-end Developer, I build products by piloting AI, from idea to production.",
    bio2: "A real developer's path turned AI-augmented builder, not a no-code convert. That's what lets me direct AI instead of enduring it, and audit what it produces.",
    clientsLabel: "Clients",
    clientsNote: "· freelance work · front-end integration",
    portraitAlt: "Louis Rotellini",
  },

  contact: {
    num: "06",
    label: "Contact",
    title: "Let's build something.",
    emailKey: "Email",
    emailCopyHint: "copy ⧉",
    emailCopyAria: "Copy email address",
    copied: "Email copied",
    githubKey: "GitHub",
    linkedinKey: "LinkedIn",
    newTab: "(new tab)",
  },

  footer: {
    rights: "© 2026 Louis Rotellini",
    legal: "Legal notice",
    madeFor: "Built for humans & machines",
    soundOff: "Sound off",
    soundOn: "Sound on",
    accentAria: "Accent",
    accents: { cobalt: "Cobalt", orange: "Orange", green: "Green", violet: "Violet" },
    themeAria: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
  },

  palette: {
    placeholder: "Jump to a section, or run an action…",
    inputAria: "Command",
    dialogAria: "Command palette",
    groupGoto: "Go to",
    groupActions: "Actions",
    gotoTop: "Top of page",
    gotoWork: "Products",
    gotoLive: "Live demo",
    gotoMachine: "Human / Machine",
    gotoApproach: "Approach",
    gotoAbout: "Background",
    gotoContact: "Contact",
    actAgent: "Agent view",
    actGate: "Run the live gate",
    actEmail: "Copy email",
    actGithub: "GitHub",
    actLinkedin: "LinkedIn",
    actLegal: "Legal notice",
    actLang: "Version française",
    empty: "No results",
    footNav: "navigate",
    footOpen: "open",
    footClose: "close",
  },

  notFound: {
    metaTitle: "Page not found",
    eyebrow: "Route not found · Error",
    body: "This page doesn't exist (or no longer does). You can head back home, or email me if you were looking for something specific.",
    backHome: "Back home",
    emailCta: "Email me",
  },

  legal: {
    metaTitle: "Legal notice",
    metaDescription: "Legal information for the louisrotellini.fr website.",
    eyebrow: "Legal notice",
    back: "← Back to portfolio",
    title: "Legal notice.",
    intro:
      "Legal information for the louisrotellini.fr website, under French law on confidence in the digital economy.",
    publisherTitle: "Publisher",
    publisherRole: "Louis Rotellini, AI Product Engineer.",
    publisherLocation: "Lille / Paris, France.",
    contactPrefix: "Contact: ",
    hostTitle: "Host",
    hostBody: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    ipTitle: "Intellectual property",
    ipBody:
      "All content on this site (text, code, images, structure) is protected by copyright. Any reproduction, even partial, requires prior authorization.",
    dataTitle: "Personal data",
    dataBody:
      "This site uses no third-party advertising cookies. Visit statistics are collected via Vercel Web Analytics, anonymously and without any transfer outside the EU.",
    dataBullets: [
      "No user profiling",
      "No advertising cookies",
      "Anonymized data, kept for 30 days",
    ],
    contactTitle: "Contact",
    contactBody: "For any question about this legal notice or data protection: ",
    lastUpdate: "Last updated · July 2026",
    homeLink: "Home",
  },

  mail: {
    subject: "Getting in touch",
    body: `Hi Louis,

I'm reaching out after looking through your portfolio.

Thanks!`,
  },

  meta: {
    title: "Louis Rotellini · AI Product Engineer",
    description:
      "AI Product Engineer in Lille, France. I design and ship AI tools for concrete business use cases: Next.js, TypeScript, agents, RAG. Reliability through rules, evals and judgment.",
    keywords: [
      "AI Product Engineer",
      "AI Engineer",
      "Product Engineer",
      "AI tools",
      "AI products",
      "piloting AI",
      "AI agents",
      "Claude Code",
      "eval gate",
      "LLM integration",
      "Mistral",
      "Next.js",
      "TypeScript",
      "React",
      "RAG",
      "Lille",
      "Paris",
    ],
    ogTitle: "AI Product Engineer · I design and ship AI tools for concrete business use cases",
    ogImageAlt: "Louis Rotellini's portfolio: AI Product Engineer · AI tools in production",
    jobTitle: "AI Product Engineer",
    personDescription:
      "AI Product Engineer based in Lille, France. I design and ship AI tools for concrete business use cases: Next.js, TypeScript, agents, RAG. Reliability through rules and evals.",
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Claude Code",
      "AI agents",
      "RAG",
      "LLM evals",
      "MCP",
      "Mistral",
      "LLM integration",
      "Building products by piloting AI",
    ],
    serviceName: "Louis Rotellini · AI Product Engineer",
    serviceDescription:
      "Design and production delivery of AI tools for concrete business use cases (Next.js, TypeScript, agents, RAG), with a Claude Code driven workflow.",
    serviceTypes: [
      "Design and delivery of AI tools",
      "Claude Code piloting",
      "LLM integration",
      "React / Next.js / TypeScript front-end development",
    ],
    consoleTitle: "Louis Rotellini, AI Product Engineer",
    consolePortfolio: "Portfolio: https://www.louisrotellini.fr",
    consoleSpecialties: "Focus: AI tools in prod · evals · Next.js · TypeScript",
  },
};

export default en;
