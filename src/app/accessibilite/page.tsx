import { Footer, Header } from "@/components/Chrome";
import { Card } from "@/components/media";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Accessibilite.html
export const metadata = pageMetadata({
  path: "/accessibilite",
  title: "Accessibilité des sites marchands · Louis Rotellini",
  description:
    "Votre site marchand doit être accessible. Je corrige vos gabarits, au forfait. Vous avez déjà un audit ? Je le lis et je chiffre la correction, sans frais.",
});

const PRICES = [
  ["Lecture de votre audit existant", "Et chiffrage de la correction.", "Offerte"],
  ["Audit sur échantillon", "17 pages, tunnel d'achat compris, rapport et projet de déclaration.", "3 900 €"],
  ["Correction d'un composant commun", "En-tête, pied de page, menu, bandeau.", "600 €"],
  ["Correction d'un gabarit de contenu", "Accueil, page de catégorie, fiche produit, page éditoriale.", "900 €"],
  ["Correction d'un gabarit à formulaire", "Panier, livraison, paiement, connexion, compte, recherche.", "1 500 €"],
  ["Vérification après correction", "Les mêmes critères, rejoués sur les pages corrigées.", "1 200 €"],
];

export default function Accessibilite() {
  return (
    <>
      <Header brandHref="/" brandLabel="Louis Rotellini, accueil">
        <a className="hide-s" href="#loi">
          Ce que dit la loi
        </a>
        <a className="hide-s" href="#offre">
          L&apos;offre
        </a>
        <a className="hide-s" href="#prix">
          Les prix
        </a>
        <a className="btn btn--s" href="#contact">
          Me contacter
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>Votre site marchand doit être accessible. Je corrige vos gabarits, au forfait.</h1>
              <p className="lede">
                Vous avez déjà un audit ? Je le lis et je chiffre la correction, sans frais. Vous n&apos;en avez pas ?
                Je commence par l&apos;audit.
              </p>
            </div>
            <Card role="Développeur full-stack freelance, à Lille" cta="Envoyer mon audit" />
          </div>
        </div>

        <div className="strip">
          <div className="wrap strip__in">
            <span>Prix fixes, annoncés avant de commencer</span>
            <span>Shopify, WordPress, Magento</span>
            <span>RGAA, WCAG 2.1 niveau AA</span>
          </div>
        </div>

        <section id="loi" aria-labelledby="t-loi">
          <div className="wrap">
            <h2 id="t-loi">Ce que dit la loi, et ce qui se passe déjà.</h2>
            <p className="intro">L&apos;obligation est en vigueur, et déjà contrôlée.</p>
            <ul className="rows">
              <li className="row">
                <h3>L&apos;obligation</h3>
                <div>
                  <p>
                    Depuis le 28 juin 2025, l&apos;European Accessibility Act impose aux services de commerce en ligne
                    vers des consommateurs d&apos;être accessibles. Le texte français en dispense les microentreprises :
                    moins de 10 personnes et au plus 2 M€ de chiffre d&apos;affaires ou de bilan.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Les contrôles</h3>
                <div>
                  <p>
                    La DGCCRF contrôle des sites marchands depuis le début de 2026. Premier bilan présenté le 4
                    septembre 2026 : des manquements sur la moitié au moins des sites déjà contrôlés. Les résultats
                    définitifs sont attendus début 2027.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>La justice</h3>
                <div>
                  <p>
                    Le 4 juin 2026, le tribunal judiciaire de Caen a ordonné à une enseigne de la grande distribution de
                    rendre son site et son application accessibles sous six mois, sous astreinte de 500 € par jour de
                    retard. Un taux de conformité de 71 % a été jugé insuffisant.
                  </p>
                </div>
              </li>
            </ul>
            <p className="note">
              Sources : directive (UE) 2019/882 ; bilan de la DGCCRF présenté à la Conférence nationale du handicap, 4
              septembre 2026 ; TJ Caen, référé, 4 juin 2026.
            </p>
          </div>
        </section>

        <section className="how" id="offre" aria-labelledby="t-offre">
          <div className="wrap">
            <h2 id="t-offre">Deux façons de commencer.</h2>
            <ol className="steps">
              <li>
                <h3>Vous avez déjà un audit</h3>
                <p>
                  Vous me l&apos;envoyez. Je le lis, je vous dis ce qui se corrige dans vos gabarits et pour combien.
                  Cette lecture est offerte.
                </p>
              </li>
              <li>
                <h3>Vous n&apos;avez pas d&apos;audit</h3>
                <p>
                  J&apos;audite un échantillon de 17 pages, tunnel d&apos;achat compris, selon la méthode du RGAA. Vous
                  recevez un rapport et un projet de déclaration d&apos;accessibilité.
                </p>
              </li>
              <li>
                <h3>Ensuite, je corrige</h3>
                <p>
                  Gabarit par gabarit, dans votre thème ou votre CMS. Une vérification après correction clôt le
                  travail.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="prix" aria-labelledby="t-prix">
          <div className="wrap">
            <h2 id="t-prix">Les prix, hors taxes.</h2>
            <p className="intro">Un prix par livrable. Pas de jours comptés.</p>
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
          </div>
        </section>

        <section className="alt" aria-labelledby="t-franc">
          <div className="wrap">
            <h2 id="t-franc" className="h2gap">
              Ce que je promets, et ce que je ne promets pas.
            </h2>
            <ul className="rows">
              <li className="row">
                <h3>Je promets</h3>
                <div>
                  <p>
                    Des gabarits corrigés dans votre code, critère par critère, et la liste de ce qui a changé. Un
                    interlocuteur unique, qui connaît le front-end des sites marchands.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Je ne promets pas</h3>
                <div>
                  <p>
                    Une conformité totale ni une certification : personne ne peut les garantir honnêtement. Je
                    n&apos;installe pas de widget : un site ne devient pas conforme sans correction du code.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>D&apos;où je parle</h3>
                <div>
                  <p>
                    Je développe pour Damart depuis 2020 et je produis les landing pages de Decathlon depuis 2023. Les
                    gabarits, les formulaires et les composants sont mon quotidien.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Envoyez-moi votre audit, ou l&apos;adresse de votre site.</h2>
            <p>Je vous réponds avec ce qui se corrige et pour combien.</p>
            <a
              className="bigmail"
              href="mailto:louis.rotellini@gmail.com?subject=Accessibilit%C3%A9%20de%20notre%20site%20marchand"
            >
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
