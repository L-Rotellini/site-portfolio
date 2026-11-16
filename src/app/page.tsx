import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { Card, Logo, Shot, TextShot } from "@/components/media";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Accueil.html
export const metadata = pageMetadata({
  path: "/",
  title: "Louis Rotellini · développeur full-stack freelance à Lille",
  description:
    "Je développe vos pages, vos sites et vos applications web, de la conception à la mise en ligne. Pour Damart depuis 2020, pour Decathlon depuis 2023, et pour mes propres produits.",
});

export default function Accueil() {
  return (
    <>
      <Header brandHref="/" brandLabel="Louis Rotellini, accueil">
        <a className="hide-s" href="#pages">
          Réalisations
        </a>
        <a className="hide-s" href="#methode">
          Ce que je fais
        </a>
        <a className="btn btn--s" href="#contact">
          Me contacter
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>Je développe vos pages, vos sites et vos applications web, de la conception à la mise en ligne.</h1>
              <p className="lede">
                Pour Damart depuis 2020, pour Decathlon depuis 2023, et pour mes propres produits.{" "}
                <a href="#pages">Voir mes réalisations</a>.
              </p>
            </div>
            <Card role="Développeur full-stack freelance, à Lille" cta="Me contacter" />
          </div>
        </div>

        <div className="since">
          <div className="wrap since__in">
            <div>
              <Logo name="decathlon" />
              <p>
                <strong>Depuis avril 2023.</strong> 131 landing pages publiées en 2026, au 6 novembre.
              </p>
            </div>
            <div>
              <Logo name="damart" />
              <p>
                <strong>Depuis février 2020.</strong> Chaque campagne sur trois marchés, en deux langues.
              </p>
            </div>
          </div>
        </div>

        <section id="pages" aria-labelledby="t-pages">
          <div className="wrap">
            <h2 id="t-pages">Ce que j&apos;ai mis en ligne.</h2>
            <p className="intro">
              Des pages chez mes clients, une application, des extensions. Le point vert mène à la page en ligne.
            </p>

            <ul className="pages">
              <li className="page">
                {/* Capture bloquée par le contrôle anti-robot de decathlon.fr : carré de texte à la
                    place, en attendant le fichier travaux/decathlon-location-velo-lille.jpg
                    (alt prévu : « Capture de la page Location vélo Lille sur decathlon.fr »). */}
                <TextShot label="Decathlon" />
                <div>
                  <Logo name="decathlon" className="page__logo" />
                  <h3>Une série de pages locales</h3>
                  <p>La location de vélo, ville par ville : la même structure, le contenu propre à chaque ville.</p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://www.decathlon.fr/location-velo-lille_lp-W7DKMI">
                    Ouvrir la page de Lille
                  </a>
                  <span className="host">decathlon.fr</span>
                </div>
              </li>

              <li className="page">
                <Shot src="/travaux/damart-be-fetes-fr.jpg" alt="Capture de la page d'accueil de Damart Belgique" />
                <div>
                  <Logo name="damart" className="page__logo" />
                  <h3>Une page d&apos;accueil par campagne</h3>
                  <p>
                    La page d&apos;accueil change à chaque campagne. Je la monte sur un marché, puis je la décline vers
                    les deux autres.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://www.damart.be/fr_be">
                    Belgique, en français
                  </a>
                  <a className="open" href="https://www.damart.be/nl_be">
                    Belgique, en néerlandais
                  </a>
                  <a className="open" href="https://www.damart.lu/">
                    Luxembourg
                  </a>
                </div>
              </li>

              <li className="page">
                <Shot
                  src="/travaux/decathlon-rappels-produits.jpg"
                  alt="Capture de la page Rappels produits sur decathlon.fr"
                />
                <div>
                  <Logo name="decathlon" className="page__logo" />
                  <h3>Une page réglementaire tenue à jour</h3>
                  <p>
                    Les rappels de produits : une page sobre, où chaque mise à jour doit être exacte et publiée vite.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://www.decathlon.fr/lp/i/rappels-produits">
                    Ouvrir la page
                  </a>
                  <span className="host">decathlon.fr</span>
                </div>
              </li>

              <li className="page">
                <Shot
                  src="/travaux/damart-services-livraison.jpg"
                  alt="Capture de la page Livraison de Damart France"
                />
                <div>
                  <Logo name="damart" className="page__logo" />
                  <h3>Une page de service interactive, sans JavaScript</h3>
                  <p>
                    Les quatre modes de livraison : onglets, accordéons et carte animée, en CSS seul, parce que le site
                    n&apos;accepte aucun script.
                  </p>
                </div>
                <div className="page__go">
                  <span className="state">En test chez Damart, mise en ligne à venir.</span>
                </div>
              </li>

              <li className="page">
                <Shot src="/travaux/damart-guide-tailles.png" alt="Capture du guide des tailles de Damart Belgique" />
                <div>
                  <Logo name="damart" className="page__logo" />
                  <h3>Un guide des tailles lisible sur téléphone</h3>
                  <p>
                    Sept tableaux de tailles repris pour qu&apos;ils tiennent sur un petit écran, en français et en
                    néerlandais.
                  </p>
                </div>
                <div className="page__go">
                  <span className="state">Visible depuis les fiches produit de damart.be.</span>
                </div>
              </li>

              <li className="page">
                <TextShot label="WordPress" />
                <div>
                  <h3>Trois sites WordPress que je maintiens</h3>
                  <p>Je les entretiens pour leurs propriétaires : mises à jour, sauvegardes, formulaires.</p>
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
                <Shot
                  src="/projects/doctap-desktop.jpg"
                  alt="DocTap : capture de documents et assemblage PDF sur mobile"
                />
                <div>
                  <h3>Une application web en production</h3>
                  <p>
                    DocTap transforme des photos de documents en PDF propres, sur mobile. Je l&apos;ai conçue et mise en
                    production seul : Next.js, TypeScript, PDF assemblé sur le téléphone.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://doctap.app">
                    Ouvrir DocTap
                  </a>
                  <span className="host">doctap.app</span>
                </div>
              </li>

              <li className="page">
                <TextShot label="wordpress.org" />
                <div>
                  <h3>Deux extensions WordPress publiées</h3>
                  <p>Du PHP relu et accepté par l&apos;annuaire officiel de WordPress, que chacun peut installer.</p>
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
            </ul>

            <div className="others">
              <p>
                Entre 2017 et 2021, des missions freelance d&apos;intégration front-end, en équipe : Blancheporte,
                Promod, Crédit Mutuel, La Foir&apos;Fouille, Tape à l&apos;Œil. De 2021 à 2024, Disneyland Paris.
              </p>
              <div className="others__row">
                <Logo name="blancheporte" />
                <Logo name="promod" />
                <Logo name="credit-mutuel" />
                <Logo name="la-foir-fouille" className="tall" />
                <Logo name="tape-a-loeil" className="tall" />
                <Logo name="disneyland-paris" className="tall" />
              </div>
            </div>
          </div>
        </section>

        <section className="how" id="methode" aria-labelledby="t-how">
          <div className="wrap">
            <h2 id="t-how">Du premier brief à la mise en ligne, le même interlocuteur.</h2>
            <p className="intro">Ce que couvre mon travail.</p>
            <ul className="rows">
              <li className="row">
                <h3>La conception</h3>
                <div>
                  <p>
                    Je pars de votre intention, pas d&apos;un ticket. Sans maquette, je prototype avant de coder, et je
                    reviens avec des options : chez Damart, sur un brief de tableaux de tailles, j&apos;ai rendu trois
                    variantes.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Le front-end</h3>
                <div>
                  <p>
                    HTML, CSS, JavaScript, TypeScript, React et Next.js. Des interfaces qui tiennent sur téléphone, et
                    qui se passent de JavaScript quand le site l&apos;exige.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Le back-end et les données</h3>
                <div>
                  <p>
                    PHP, Node.js, PostgreSQL, API. Des extensions WordPress publiées, et un projet personnel sur
                    Supabase et PostgreSQL.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Les CMS de mes clients</h3>
                <div>
                  <p>
                    Contentstack, Magento Page Builder, WordPress : je travaille dans vos outils, avec vos composants
                    et vos règles, dans chaque langue.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>La mise en production et le suivi</h3>
                <div>
                  <p>Déploiement, mises à jour, sauvegardes, et le diagnostic quand un site ralentit.</p>
                </div>
              </li>
              <li className="row">
                <h3>L&apos;IA, quand elle sert</h3>
                <div>
                  <p>
                    J&apos;intègre des modèles de langage dans des produits, avec les tests qui prouvent qu&apos;ils font
                    ce qu&apos;ils prétendent. <Link href="/ia">Voir mes produits IA</Link>.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Un projet web à mener ?</h2>
            <p>Un mail avec ce que vous voulez construire, vos outils et votre échéance suffit pour commencer.</p>
            <a className="bigmail" href="mailto:louis.rotellini@gmail.com">
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
          { href: "/ia", label: "Produits IA et parcours" },
          { href: "/mentions-legales", label: "Mentions légales" },
        ]}
      />
    </>
  );
}
