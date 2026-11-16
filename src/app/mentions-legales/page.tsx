import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Mentions-legales.html
// Seule page où le téléphone apparaît en clair (obligation légale).
export const metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales · louisrotellini.fr",
  description:
    "Informations légales relatives au site louisrotellini.fr, conformément à la loi pour la confiance dans l'économie numérique.",
});

export default function MentionsLegales() {
  return (
    <>
      <Header brandHref="/" brandLabel="Louis Rotellini, accueil">
        <Link className="btn btn--s" href="/#contact">
          Me contacter
        </Link>
      </Header>
      <main id="contenu">
        <section className="legal">
          <div className="wrap">
            <h1>Mentions légales.</h1>
            <p className="intro">
              Informations légales relatives au site louisrotellini.fr, conformément à la loi pour la confiance dans
              l&apos;économie numérique.
            </p>
            <h2>Éditeur</h2>
            <p>Louis Rotellini, entrepreneur individuel (EI).</p>
            <ul>
              <li>SIREN : 800 503 476</li>
              <li>Adresse : 30 rue du Maréchal Foch, 59000 Lille</li>
              <li>Téléphone : 06 15 76 72 72</li>
              <li>Directeur de la publication : Louis Rotellini</li>
              <li>
                E-mail : <a href="mailto:louis.rotellini@gmail.com">louis.rotellini@gmail.com</a>
              </li>
            </ul>
            <h2>Hébergeur</h2>
            <p>Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Téléphone : +1 559 288 7060.</p>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, code, images, structure) est protégé par le
              droit d&apos;auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.
            </p>
            <h2>Données personnelles</h2>
            <p>
              Ce site n&apos;utilise aucun cookie tiers à des fins publicitaires. Les statistiques de visite sont
              mesurées par Vercel Web Analytics, sans cookie.
            </p>
            <ul>
              <li>Aucune création de profil utilisateur</li>
              <li>Aucun cookie publicitaire</li>
            </ul>
            <h2>Contact</h2>
            <p>
              Pour toute question relative aux mentions légales ou à la protection des données :{" "}
              <a href="mailto:louis.rotellini@gmail.com">louis.rotellini@gmail.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer links={[{ href: "/", label: "Accueil" }]} />
    </>
  );
}
