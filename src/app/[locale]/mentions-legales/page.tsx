import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, isLocale, localePrefix, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { EMAIL } from "@/lib/site";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const path = localizedHref(locale, "/mentions-legales");

  return {
    title: dict.legal.metaTitle,
    description: dict.legal.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        "fr-FR": "/mentions-legales",
        "en-US": "/en/mentions-legales",
        "x-default": "/mentions-legales",
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.legal;
  const home = localePrefix(locale) || "/";

  return (
    <>
      <section className="legal-head">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="n">{"//"}</span> {t.eyebrow}
          </div>
          <h1>{t.title}</h1>
          <p className="legal-sub">{t.intro}</p>
        </div>
      </section>

      <section className="legal-doc wrap">
        <article className="art">
          <div className="art__n">01</div>
          <div>
            <h2>{t.publisherTitle}</h2>
            <p>{t.publisherRole}</p>
            {t.publisherLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              {t.contactPrefix}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </article>

        <article className="art">
          <div className="art__n">02</div>
          <div>
            <h2>{t.hostTitle}</h2>
            <p>{t.hostBody}</p>
            <p>{t.hostPhone}</p>
          </div>
        </article>

        <article className="art">
          <div className="art__n">03</div>
          <div>
            <h2>{t.ipTitle}</h2>
            <p>{t.ipBody}</p>
          </div>
        </article>

        <article className="art">
          <div className="art__n">04</div>
          <div>
            <h2>{t.dataTitle}</h2>
            <p>{t.dataBody}</p>
            <ul>
              {t.dataBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="art">
          <div className="art__n">05</div>
          <div>
            <h2>{t.contactTitle}</h2>
            <p>
              {t.contactBody}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </article>

        <p className="mono" style={{ fontSize: 11.5, color: "var(--muted)", padding: "26px 0 10px" }}>
          {t.lastUpdate} · <Link href={home} style={{ textDecoration: "underline", textUnderlineOffset: 2 }}>{t.homeLink}</Link>
        </p>
      </section>
    </>
  );
}
