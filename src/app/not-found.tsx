import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";

// Page 404 : absente du prototype, réduite au strict nécessaire dans le style commun.
export const metadata = { title: { absolute: "Page introuvable · Louis Rotellini" } };

export default function NotFound() {
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
            <h1>Page introuvable.</h1>
            <p className="intro">
              <Link href="/">Retour à l&apos;accueil</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer links={[{ href: "/mentions-legales", label: "Mentions légales" }]} />
    </>
  );
}
