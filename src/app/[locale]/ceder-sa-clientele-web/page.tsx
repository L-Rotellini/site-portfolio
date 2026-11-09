import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { mailtoHref } from "@/lib/mailto";

// Page de reprise de clientèle web : française uniquement, indexée, hors menu.
const PATH = "/ceder-sa-clientele-web";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") return {};
  const t = getDictionary("fr").cession;

  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    // Pas d'hreflang : la page n'existe pas en anglais.
    alternates: { canonical: PATH, languages: {} },
    robots: { index: true, follow: true },
    // Images : ./opengraph-image.tsx et ./twitter-image.tsx.
    openGraph: {
      type: "website",
      locale: ogLocale.fr,
      url: PATH,
      siteName: "Louis Rotellini",
      title: t.metaTitle,
      description: t.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      site: "@louisrotellini",
      creator: "@louisrotellini",
      title: t.metaTitle,
      description: t.metaDescription,
    },
  };
}

export default async function CederSaClienteleWeb({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const t = getDictionary("fr").cession;
  const mail = mailtoHref(t.mailSubject, t.mailBody);

  return (
    <>
      <section className="legal-head">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="n">{"//"}</span> {t.eyebrow}
          </div>
          <h1>{t.title}</h1>
          <p className="legal-sub">{t.intro}</p>
          <div className="legal-cta">
            <a href={mail} className="btn btn--primary">
              {t.headCta} <span className="mono" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <div className="legal-doc">
        <section className="art" aria-labelledby="reprise">
          <div className="art__n" aria-hidden="true">01</div>
          <div>
            <h2 id="reprise">{t.scopeTitle}</h2>
            <ul>
              {t.scopeBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="art" aria-labelledby="un-client">
          <div className="art__n" aria-hidden="true">02</div>
          <div>
            <h2 id="un-client">{t.sizeTitle}</h2>
            <p>{t.sizeBody}</p>
          </div>
        </section>

        <section className="art" aria-labelledby="deroulement">
          <div className="art__n" aria-hidden="true">03</div>
          <div>
            <h2 id="deroulement">{t.stepsTitle}</h2>
            <ol className="steps">
              {t.steps.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong> {s.body}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="art" aria-labelledby="qui">
          <div className="art__n" aria-hidden="true">04</div>
          <div>
            <h2 id="qui">{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
          </div>
        </section>

        <section className="art" aria-labelledby="questions">
          <div className="art__n" aria-hidden="true">05</div>
          <div>
            <h2 id="questions">{t.faqTitle}</h2>
            {t.faq.map((f) => (
              <div className="faq" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="art" aria-labelledby="contact-cession">
          <div className="art__n" aria-hidden="true">06</div>
          <div>
            <h2 id="contact-cession">{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
            <div className="legal-cta">
              <a href={mail} className="btn btn--primary">
                {t.contactCta} <span className="mono" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
