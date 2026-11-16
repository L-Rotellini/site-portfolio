import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import LiveGate from "@/components/LiveGate";
import { Card, Shot, TextShot } from "@/components/media";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/IA.html
export const metadata = pageMetadata({
  path: "/ia",
  title: "Louis Rotellini · AI Product Engineer à Lille",
  description:
    "Je conçois et mets en production des outils IA pour des usages métier concrets : DocTap, RelancIA, un moteur de scoring et une démo d'évaluation à essayer.",
});

export default function IA() {
  return (
    <>
      <Header brandHref="/" brandLabel="Louis Rotellini, accueil">
        <a className="hide-s" href="#produits">
          Produits
        </a>
        <a className="hide-s" href="#approche">
          Approche
        </a>
        <a className="hide-s" href="#parcours">
          Parcours
        </a>
        <a className="btn btn--s" href="#contact">
          Me contacter
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>Je conçois et mets en production des outils IA pour des usages métier concrets.</h1>
              <p className="lede">
                AI Product Engineer. <a href="#produits">Voir mes produits</a>.
              </p>
            </div>
            <Card role="AI Product Engineer, à Lille" cta="Me contacter" />
          </div>
        </div>

        <div className="strip">
          <div className="wrap strip__in">
            <span>Full-Stack : Next.js, TypeScript, Node.js</span>
            <span>Intégration LLM, RAG, agents IA</span>
            <span>Évaluation de modèles</span>
          </div>
        </div>

        <section id="produits" aria-labelledby="t-prod">
          <div className="wrap">
            <h2 id="t-prod">Ce que j&apos;ai construit.</h2>
            <p className="intro">
              Quatre produits : un en production publique, un prototype en ligne, deux projets privés.
            </p>

            <ul className="pages">
              <li className="page">
                <Shot
                  src="/projects/doctap-desktop.jpg"
                  alt="DocTap : capture de documents et assemblage PDF sur mobile"
                />
                <div>
                  <h3>DocTap</h3>
                  <p>
                    Une application web pour mobile qui transforme des photos de documents en PDF propres, prêts à
                    imprimer. Née d&apos;un besoin observé chez une utilisatrice réelle, en santé à domicile.
                  </p>
                  <p className="proof">
                    Aucun document conservé côté serveur par DocTap : ni base, ni espace de fichiers. En mode IA,
                    Mistral conserve entrées et sorties 30 jours.
                  </p>
                  <p className="tags">Next.js, TypeScript, IndexedDB, pdf-lib, Mistral</p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://doctap.app">
                    Ouvrir DocTap
                  </a>
                  <span className="host">doctap.app, en production publique</span>
                </div>
              </li>

              <li className="page">
                <Shot src="/projects/relancia-desktop.jpg" alt="RelancIA : éditeur de relance de facture" />
                <div>
                  <h3>RelancIA</h3>
                  <p>
                    Un agent qui rédige les relances de factures dans la voix de celui qui les envoie, à partir de ses
                    propres exemples.
                  </p>
                  <p className="proof">
                    Aucune capacité d&apos;envoi dans le code : l&apos;application prépare un brouillon, l&apos;utilisateur
                    relit et envoie lui-même.
                  </p>
                  <p className="tags">Next.js, React, TypeScript, API Mistral</p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://relanc-ia.vercel.app">
                    Ouvrir RelancIA
                  </a>
                  <span className="host">Prototype en ligne, testé avec un premier utilisateur</span>
                </div>
              </li>

              <li className="page">
                <Shot
                  src="/projects/horizon-desktop.jpg"
                  alt="Horizon : chat multi-agents sur une base de connaissance"
                />
                <div>
                  <h3>Horizon</h3>
                  <p>
                    Un hub de connaissance personnel : quatre agents spécialisés interrogent une base de fiches
                    commune, un routeur choisit l&apos;agent à chaque message.
                  </p>
                  <p className="proof">
                    Les outils exposés au modèle sont incapables d&apos;écrire en base : l&apos;IA propose,
                    l&apos;écriture attend une validation humaine. Clé d&apos;API côté serveur, RLS active.
                  </p>
                  <p className="tags">Next.js, TypeScript, Supabase, Postgres, pgvector 512d avec index HNSW</p>
                </div>
                <div className="page__go">
                  <span className="state">MVP fonctionnel, sans démo publique.</span>
                </div>
              </li>

              <li className="page">
                <Shot
                  src="/projects/assistant-tri-offres-desktop.jpg"
                  alt="Moteur de scoring : grille d'évaluation"
                />
                <div>
                  <h3>Moteur de scoring</h3>
                  <p>
                    Un modèle de langage nuance par défaut et évite de trancher. Ce moteur lui impose des règles
                    fermes et éliminatoires, itérées jusqu&apos;à ce que le classement corresponde au jugement attendu.
                  </p>
                </div>
                <div className="page__go">
                  <span className="state">Projet privé de recherche.</span>
                </div>
              </li>

              <li className="page">
                <TextShot label="Gate d'éval" />
                <div>
                  <h3>La démo : un gate d&apos;éval</h3>
                  <p>
                    Décrivez une fonctionnalité IA : un modèle la juge en direct contre quatre règles éliminatoires
                    (évals, relecture humaine, coût borné, gestion d&apos;échec), et dit ce qui manque quand elle
                    échoue.
                  </p>
                  <p className="proof">
                    La démo est elle-même plafonnée : 6 essais, 600 caractères, verdict calculé côté serveur.
                  </p>
                </div>
                <LiveGate />
              </li>
            </ul>
          </div>
        </section>

        <section className="how" id="approche" aria-labelledby="t-app">
          <div className="wrap">
            <h2 id="t-app">Rendre fiable un système faillible.</h2>
            <ol className="steps steps--n">
              <li>
                <h3>Une cible mesurable</h3>
                <p>
                  Je ne pars jamais de l&apos;envie d&apos;ajouter de l&apos;IA, mais d&apos;un temps à réduire,
                  d&apos;un coût par tâche à plafonner ou d&apos;un taux de succès à tenir. Parfois, une règle suffit
                  et il n&apos;y a pas d&apos;IA du tout.
                </p>
              </li>
              <li>
                <h3>La frontière entre règle et modèle</h3>
                <p>
                  Décider où une règle dure s&apos;impose et où le modèle peut trancher. Un étage déterministe passe
                  avant le modèle chaque fois que c&apos;est possible.
                </p>
              </li>
              <li>
                <h3>Des évals avant la production</h3>
                <p>
                  Verdict et raisonnement mesurés séparément, tests de non-régression, citations vérifiées
                  mécaniquement, modèles épinglés à une version.
                </p>
              </li>
              <li>
                <h3>L&apos;IA dirigée, la décision gardée</h3>
                <p>
                  Je pilote Claude Code : cadrage, étapes livrables, revue du code par un agent séparé sur un contexte
                  neuf. Ce qui part en production, c&apos;est moi qui le tranche.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="parcours" aria-labelledby="t-par">
          <div className="wrap">
            <h2 id="t-par" className="h2gap">
              Du développement web aux produits IA.
            </h2>
            <ul className="rows">
              <li className="row">
                <h3>Aujourd&apos;hui</h3>
                <div>
                  <p>
                    Développeur Front-end à l&apos;IÉSEG depuis 2024, et freelance pour Decathlon depuis 2023 et Damart
                    depuis 2020. Je construis mes produits IA à côté.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Avant</h3>
                <div>
                  <p>
                    Une dizaine d&apos;années de web : l&apos;intégration d&apos;abord, puis le développement front-end
                    sur plusieurs CMS. Disneyland Paris de 2021 à 2024, en équipe agile.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Les pages de mes clients</h3>
                <div>
                  <p>
                    Mon travail pour Damart et Decathlon est sur <Link href="/">la page d&apos;accueil</Link>, avec les
                    liens vers les pages en ligne.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="contact alt" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Un poste ou une mission IA ?</h2>
            <p>Écrivez-moi.</p>
            <a className="bigmail" href="mailto:louis.rotellini@gmail.com">
              louis.rotellini@gmail.com
            </a>
            <p className="contact__alt">
              <a href="https://github.com/L-Rotellini">GitHub</a> ·{" "}
              <a href="https://www.linkedin.com/in/louis-rotellini/">LinkedIn</a>
            </p>
          </div>
        </section>
      </main>

      <Footer
        links={[
          { href: "/", label: "Accueil" },
          { href: "/mentions-legales", label: "Mentions légales" },
        ]}
      />
    </>
  );
}
