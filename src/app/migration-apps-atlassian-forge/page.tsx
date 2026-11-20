import { headers } from "next/headers";
import { Footer, Header } from "@/components/Chrome";
import { Card } from "@/components/media";
import { SITE_URL, pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Migration-Forge.html
// Page hors menu : l'accueil n'y mène pas (page d'arrivée des messages LinkedIn).
const PATH = "/migration-apps-atlassian-forge";
const PAGE_URL = `${SITE_URL}${PATH}`;

// Ligne « Une migration publiée » de « Qui je suis », en commentaire dans le prototype.
// À passer à true quand la migration de référence est publiée (voir CLAUDE.md).
const SHOW_PUBLISHED_MIGRATION = false;

const DESCRIPTION =
  "Atlassian arrête le support de Connect le 31 janvier 2027. Développeur indépendant, je migre vers Forge l'app Jira ou Confluence développée pour votre entreprise, au forfait, avec la preuve qu'elle fait toujours la même chose.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Migration de vos apps Jira et Confluence vers Forge · Louis Rotellini",
  description: DESCRIPTION,
});

// Retours à la ligne du corps en %0D%0A, comme dans le prototype.
const MAILTO =
  "mailto:louis.rotellini@gmail.com?subject=Migration%20de%20notre%20app%20Atlassian%20vers%20Forge&body=Bonjour%20Louis%2C%0D%0A%0D%0ANotre%20app%20%3A%0D%0AJira%2C%20Confluence%20ou%20Jira%20Service%20Management%20%3A%0D%0AO%C3%B9%20se%20trouve%20son%20code%20%3A%0D%0A%0D%0AMerci%2C";

const serviceLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Migration d'apps Atlassian Connect vers Forge",
      description: DESCRIPTION,
      url: PAGE_URL,
      areaServed: { "@type": "Country", name: "France" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: PAGE_URL,
        availableLanguage: { "@type": "Language", name: "français", alternateName: "fr" },
      },
      provider: { "@id": `${PAGE_URL}#louis-rotellini` },
    },
    {
      "@type": "Person",
      "@id": `${PAGE_URL}#louis-rotellini`,
      name: "Louis Rotellini",
      jobTitle: "Développeur web indépendant",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Lille", addressCountry: "FR" },
    },
  ],
};

const PRICES = [
  ["Lecture du code et devis", "Après signature de l'accord de confidentialité.", "Offerts"],
  ["App légère", "Par exemple : un ou deux modules, peu ou pas de données à reprendre.", "dès 3 900 €"],
  [
    "App standard",
    "Par exemple : plusieurs modules, des données à reprendre ou des intégrations à d'autres outils.",
    "dès 11 900 €",
  ],
];

export default async function MigrationForge() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <Header brandHref="/" brandLabel="Louis Rotellini, accueil">
        <a className="hide-s" href="#date">
          Ce qui change
        </a>
        <a className="hide-s" href="#preuve">
          La preuve
        </a>
        <a className="hide-s" href="#prix">
          Les prix
        </a>
        <a className="btn btn--s" href="#contact">
          M&apos;écrire
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>
                Votre app Jira tourne encore sur Connect ? Je la migre vers Forge et je prouve qu&apos;elle fait la
                même chose.
              </h1>
              <p className="lede">
                Le 31 janvier 2027, Atlassian arrête le support de Connect, le cadre sur lequel reposent beaucoup
                d&apos;apps Jira et Confluence construites sur mesure. Les apps du Marketplace sont migrées par leurs
                éditeurs ; celle qui a été développée pour vous doit l&apos;être par vous. Je m&apos;en charge, au
                forfait.
              </p>
            </div>
            <Card role="Développeur full-stack freelance, à Lille" cta="M'écrire un mail" />
          </div>
        </div>

        <div className="strip">
          <div className="wrap strip__in">
            <span>Prix ferme après lecture du code</span>
            <span>Même comportement, preuve à l&apos;appui</span>
            <span>Un seul interlocuteur</span>
          </div>
        </div>

        <section id="date" aria-labelledby="t-date">
          <div className="wrap">
            <h2 id="t-date">Votre app ne peut déjà plus recevoir de mise à jour Connect.</h2>
            <p className="intro">Et la date du 31 janvier 2027 n&apos;est pas la fin de l&apos;histoire.</p>
            <ul className="rows">
              <li className="row">
                <h3>Depuis le 31 mars 2026</h3>
                <div>
                  <p>
                    Une app sur mesure qui n&apos;a pas commencé sa migration ne peut plus recevoir de mise à jour
                    Connect.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Après le 31 janvier 2027</h3>
                <div>
                  <p>
                    Connect ne reçoit plus que les correctifs de sécurité critiques, et son usage se fait à vos
                    risques. Atlassian n&apos;a pas annoncé d&apos;arrêt à cette date, mais des fonctions peuvent cesser
                    de marcher, parfois avec peu de préavis.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Votre app est-elle concernée ?</h3>
                <div>
                  <p>
                    Dans l&apos;administration de votre site Atlassian, la page des applications connectées signale
                    celles qui reposent encore sur Connect. Une app construite il y a plus de cinq ans y repose très
                    probablement.
                  </p>
                </div>
              </li>
            </ul>
            <p className="note">
              Sources : Atlassian, « Connect end of support: what it means for custom apps and how to migrate to Forge
              » et « Getting ready for Connect end of support » ; documentation Atlassian du module de migration
              Connect vers Forge.
            </p>
          </div>
        </section>

        <section className="how" id="preuve" aria-labelledby="t-preuve">
          <div className="wrap">
            <h2 id="t-preuve">Votre app fait la même chose avant et après, sauf ce que le devis signale.</h2>
            <p className="intro">Ce que vous achetez, c&apos;est la preuve que rien n&apos;a bougé pour vos équipes.</p>
            <ol className="steps">
              <li>
                <h3>Les mêmes tests sur les deux versions</h3>
                <p>
                  Je fais tourner la même suite de tests sur l&apos;ancienne app et sur la nouvelle, et je vérifie
                  qu&apos;elle repère bien une erreur introduite exprès. Vous recevez le relevé avec chaque livraison.
                </p>
              </li>
              <li>
                <h3>Pas de tests aujourd&apos;hui ?</h3>
                <p>
                  Je construis un banc de scénarios réels qui compare les résultats des deux versions. Son coût est
                  inclus dans le prix du devis.
                </p>
              </li>
              <li>
                <h3>Vos données</h3>
                <p>
                  Le devis précise comment celles que votre app garde dans Jira ou Confluence passent dans la nouvelle
                  version, et le passage est vérifié dans les deux sens.
                </p>
              </li>
            </ol>
            <p className="tools">
              <strong>Ce qui n&apos;a pas d&apos;équivalent :</strong> si une fonction de votre app n&apos;existe pas
              sur Forge, ou si son code source manque, le devis le dit avant tout engagement et précise ce qui
              changera. Tout le reste fait la même chose qu&apos;avant.
            </p>
          </div>
        </section>

        <section aria-labelledby="t-etapes">
          <div className="wrap">
            <h2 id="t-etapes">Un devis gratuit, puis un forfait.</h2>
            <ol className="steps steps--5">
              <li>
                <h3>Vous m&apos;écrivez</h3>
                <p>
                  Le nom de l&apos;app, le produit (Jira, Confluence ou Jira Service Management) et où se trouve son
                  code.
                </p>
              </li>
              <li>
                <h3>Un accord de confidentialité</h3>
                <p>
                  Signé avant que j&apos;accède au code, il le protège pendant cinq ans et n&apos;engage aucun achat.
                </p>
              </li>
              <li>
                <h3>Un prix ferme</h3>
                <p>Je lis le code et vous envoie un devis au prix ferme, gratuit et sans engagement.</p>
              </li>
              <li>
                <h3>La livraison</h3>
                <p>Par pull request, avec le relevé des vérifications. Votre équipe publie la nouvelle version.</p>
              </li>
              <li>
                <h3>La garantie</h3>
                <p>
                  Pendant 30 jours après la livraison, je corrige sans frais tout écart avec le comportement de
                  l&apos;ancienne version.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="alt" id="prix" aria-labelledby="t-prix">
          <div className="wrap">
            <h2 id="t-prix">Les prix, hors taxes, par app.</h2>
            <p className="intro">
              Un forfait par app, fixé après lecture du code. Paiement de 50 % à la signature du devis et de 50 % à la
              livraison.
            </p>
            <ul className="rows">
              {PRICES.map(([title, detail, price]) => (
                <li key={title} className="row row--price">
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                  <span className="price">{price}</span>
                </li>
              ))}
            </ul>
            <p className="note">
              Ces exemples donnent un ordre de grandeur. Le prix de votre app est celui du devis, fixé après lecture du
              code.
            </p>
          </div>
        </section>

        <section aria-labelledby="t-qui">
          <div className="wrap">
            <h2 id="t-qui" className="h2gap">
              Qui je suis.
            </h2>
            <ul className="rows">
              <li className="row">
                <h3>D&apos;où je parle</h3>
                <div>
                  <p>
                    Développeur web indépendant depuis 2017. Des marques me confient leurs pages depuis des années :
                    Damart depuis 2020, Decathlon depuis 2023.
                  </p>
                </div>
              </li>
              {SHOW_PUBLISHED_MIGRATION && (
                <li className="row">
                  <h3>Une migration publiée</h3>
                  <div>
                    <p>
                      Une migration Connect vers Forge publiée en open source, avec son relevé de vérifications.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Parlons de votre app.</h2>
            <p>Un mail suffit. C&apos;est moi qui vous réponds.</p>
            <a className="bigmail" href={MAILTO}>
              louis.rotellini@gmail.com
            </a>
            <p className="contact__alt">
              Ou sur <a href="https://www.linkedin.com/in/louis-rotellini/">LinkedIn</a>.
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
