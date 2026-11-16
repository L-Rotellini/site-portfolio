import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { Card, Logo, Shot, TextShot } from "@/components/media";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Ceder.html
// Page hors menu : la marque de l'en-tête pointe vers la page elle-même, pas vers l'accueil.
const PATH = "/ceder-sa-clientele-web";

export const metadata = pageMetadata({
  path: PATH,
  title: "Céder sa clientèle web · Louis Rotellini",
  description:
    "Retraite, ralentissement ou changement de métier : vos clients gardent un interlocuteur pour leur site, et vous êtes payé pour la clientèle que vous avez construite.",
});

const FAQ = [
  [
    "Combien vaut ma clientèle ?",
    "Cela dépend surtout de ce qui revient chaque année (maintenance, hébergement), de l'ancienneté de vos clients et de l'état de leurs sites. Je ne donne pas de chiffre à l'aveugle : la proposition vient après avoir vu les contrats.",
  ],
  [
    "Mes clients doivent-ils être d'accord ?",
    "Oui, chacun, par écrit. C'est pourquoi le message vient de vous : un client qui connaît son prestataire depuis des années suit plus volontiers celui que ce prestataire lui recommande.",
  ],
  [
    "Mes sites sont anciens, est-ce un problème ?",
    "Pas en soi. Je regarde l'état de chaque site avant la proposition. Un site ancien qui fonctionne continue d'être maintenu ; une mise à niveau se propose quand le client la demande, après la transition ; avant, seulement si la sécurité l'exige.",
  ],
  [
    "Je veux continuer encore un peu, est-ce possible ?",
    "Oui. On peut préparer la reprise des mois à l'avance, ou commencer par une partie de vos clients.",
  ],
  [
    "Je ne suis pas encore décidé.",
    "Aucun souci. Un premier échange n'engage à rien, et vous pouvez revenir vers moi quand la question se posera.",
  ],
];

export default function Ceder() {
  return (
    <>
      <Header brandHref={PATH} brandLabel="Louis Rotellini">
        <a className="hide-s" href="#etapes">
          Comment se passe une reprise
        </a>
        <a className="btn btn--s" href="#contact">
          Parler de ma cession
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>Vous arrêtez votre activité web ? Je reprends vos clients et leurs sites.</h1>
              <p className="lede">
                Retraite, ralentissement ou changement de métier : vos clients gardent un interlocuteur pour leur site,
                et vous êtes payé pour la clientèle que vous avez construite.
              </p>
            </div>
            <Card role="Développeur web, à Lille" cta="Parler de ma cession" />
          </div>
        </div>

        <div className="strip">
          <div className="wrap strip__in strip__in--wide">
            <span>À partir d&apos;un seul client</span>
            <span>WordPress, Divi, Elementor</span>
            <span>Prix payé en deux temps</span>
            <span>Premier échange confidentiel</span>
          </div>
        </div>

        <section aria-labelledby="t-quoi">
          <div className="wrap">
            <h2 id="t-quoi">Ce que je reprends : ce qui fait tourner les sites de vos clients.</h2>
            <p className="intro">
              Vous n&apos;avez pas besoin d&apos;un gros portefeuille. Un seul contrat de maintenance, quelques sites
              hébergés, ou seulement la partie maintenance si vous gardez la création : tout se discute.
            </p>
            <ul className="rows">
              <li className="row">
                <h3>La maintenance des sites</h3>
                <div>
                  <p>Mises à jour, sauvegardes, sécurité, petites modifications demandées par vos clients.</p>
                </div>
              </li>
              <li className="row">
                <h3>L&apos;hébergement et les noms de domaine</h3>
                <div>
                  <p>
                    Je reprends le compte ou je migre, selon ce qui est le plus simple pour chaque client. Chez OVH,
                    o2switch, Ionos ou ailleurs.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Les contrats en cours</h3>
                <div>
                  <p>Repris tels qu&apos;ils ont été signés ; leurs conditions se voient ensemble avant toute proposition.</p>
                </div>
              </li>
              <li className="row">
                <h3>Les sites WordPress</h3>
                <div>
                  <p>
                    Quel que soit le constructeur : Divi, Elementor, Gutenberg, thème sur mesure. Les autres
                    technologies s&apos;étudient au cas par cas.
                  </p>
                </div>
              </li>
            </ul>
            <p className="note">Je reprends des contrats et des sites, pas de salariés ni de local.</p>
          </div>
        </section>

        <section className="how" id="etapes" aria-labelledby="t-etapes">
          <div className="wrap">
            <h2 id="t-etapes">Six étapes, sur un calendrier fixé ensemble.</h2>
            <ol className="steps steps--n">
              <li>
                <h3>Un premier échange, confidentiel</h3>
                <p>Vous me décrivez vos clients, leurs sites, leurs contrats et votre calendrier.</p>
              </li>
              <li>
                <h3>Une proposition écrite</h3>
                <p>
                  Après avoir vu les contrats et les sites, et si la reprise me paraît possible : un prix et le
                  calendrier de la transition.
                </p>
              </li>
              <li>
                <h3>Vous présentez la suite</h3>
                <p>
                  Chaque client reçoit un message de votre part et donne son accord par écrit. C&apos;est votre parole
                  qui compte pour lui.
                </p>
              </li>
              <li>
                <h3>La signature</h3>
                <p>L&apos;acte de cession est signé.</p>
                <span className="paid">1re partie du prix versée</span>
              </li>
              <li>
                <h3>La transition</h3>
                <p>
                  Je reprends les accès un par un, en m&apos;assurant que tout fonctionne ; vous restez joignable
                  pendant une période fixée ensemble.
                </p>
              </li>
              <li>
                <h3>Le solde du prix</h3>
                <p>Douze mois après la signature, selon les clients restés.</p>
                <span className="paid">Solde versé</span>
              </li>
            </ol>
            <p className="note">Rien n&apos;est dit à vos clients tant que vous ne l&apos;avez pas décidé.</p>
          </div>
        </section>

        <section aria-labelledby="t-qui">
          <div className="wrap">
            <h2 id="t-qui">Une personne, pas une plateforme.</h2>
            <p className="intro">
              Une dizaine d&apos;années de web. Je reprends vos clients moi-même et je reste leur interlocuteur. Je
              rachète pour mon propre compte ; je ne mets pas en relation vendeurs et acheteurs.
            </p>
            <ul className="pages">
              <li className="page">
                <TextShot label="wordpress.org" />
                <div>
                  <h3>Deux extensions WordPress publiées</h3>
                  <p>
                    Sur l&apos;annuaire officiel wordpress.org, sous la marque Antwork. Vous pouvez les installer et
                    lire leur code.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://wordpress.org/plugins/antwork-field-editor/">
                    Antwork Field Editor
                  </a>
                  <a className="open" href="https://wordpress.org/plugins/antwork-field-code/">
                    Antwork Field Code
                  </a>
                  <span className="host">wordpress.org</span>
                </div>
              </li>
              <li className="page">
                <TextShot label="WordPress" />
                <div>
                  <h3>Des sites WordPress entretenus aujourd&apos;hui</h3>
                  <p>
                    Je maintiens des sites WordPress pour mes clients : développement, mises à jour, sauvegardes,
                    formulaires, référencement.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://quai38-lille.fr/">
                    Quai 38, Lille
                  </a>
                  <a className="open" href="https://www.lespetitesexperiences.com">
                    Les Petites Expériences
                  </a>
                  <a className="open" href="https://www.lespetitesjambes.com">
                    Les Petites Jambes
                  </a>
                </div>
              </li>
              <li className="page">
                <Shot src="/travaux/damart-be-fetes-fr.jpg" alt="Capture de la page d'accueil de Damart Belgique" />
                <div>
                  <h3>Plusieurs CMS, pour des enseignes</h3>
                  <p>
                    J&apos;ai intégré et développé sur WordPress, Magento et d&apos;autres, notamment pour Damart et
                    Decathlon.
                  </p>
                </div>
                <div className="page__go">
                  <Link className="open" href="/">
                    Voir ces pages
                  </Link>
                  <span className="host">louisrotellini.fr</span>
                </div>
              </li>
            </ul>
            <div className="others">
              <p>Des enseignes pour qui je travaille ou j&apos;ai travaillé, en missions freelance.</p>
              <div className="others__row">
                <Logo name="decathlon" />
                <Logo name="damart" />
                <Logo name="blancheporte" />
                <Logo name="promod" />
                <Logo name="disneyland-paris" className="tall" />
              </div>
            </div>
          </div>
        </section>

        <section className="alt" aria-labelledby="t-faq">
          <div className="wrap">
            <h2 id="t-faq" className="h2gap">
              Ce qu&apos;on me demande avant de se lancer.
            </h2>
            <div className="faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Parlons de vos clients.</h2>
            <p>Écrivez-moi en quelques lignes : un premier échange n&apos;engage à rien.</p>
            <ul>
              <li>Le nombre de sites et de clients</li>
              <li>La technologie</li>
              <li>L&apos;hébergeur</li>
              <li>L&apos;échéance que vous avez en tête</li>
            </ul>
            <a className="bigmail" href="mailto:louis.rotellini@gmail.com?subject=Cession%20de%20client%C3%A8le%20web">
              louis.rotellini@gmail.com
            </a>
          </div>
        </section>
      </main>

      <Footer
        links={[
          { href: "/", label: "louisrotellini.fr" },
          { href: "/mentions-legales", label: "Mentions légales" },
        ]}
      />
    </>
  );
}
