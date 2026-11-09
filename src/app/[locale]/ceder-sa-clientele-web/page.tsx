import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandMark from "@/components/BrandMark";
import { ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { mailtoHref } from "@/lib/mailto";
import s from "./cession.module.css";

// Page de reprise de clientèle web : française uniquement, indexée, hors menu.
// Page autonome (standalonePaths) : son en-tête, son <main> et son pied de page sont ici ;
// SiteShell n'affiche pas ceux du portfolio. Maquette : docs/design/cession-v2.html (V2 validée).
const PATH = "/ceder-sa-clientele-web";

// width/height = taille affichée (hauteur 22 px, 34 px pour Disneyland Paris), au ratio du viewBox.
const LOGOS = [
  { src: "/logos/decathlon.svg", alt: "Decathlon", w: 146, h: 22 },
  { src: "/logos/damart.svg", alt: "Damart", w: 136, h: 22 },
  { src: "/logos/blancheporte.svg", alt: "Blancheporte", w: 120, h: 22 },
  { src: "/logos/promod.svg", alt: "Promod", w: 147, h: 22 },
  { src: "/logos/disneyland-paris.svg", alt: "Disneyland Paris", w: 120, h: 34, tall: true },
];

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
    // robots : hérité du layout (index, follow + directives googleBot).
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

function MailIcon() {
  return (
    <svg className={s.btnIco} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
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
  const { hero, scope, steps, about, faq, contact, footer } = t;
  const plugins = about.proofPlugins;

  const mailButton = (className: string) => (
    <a className={className} href={mail}>
      <MailIcon />
      {t.cta}
    </a>
  );

  return (
    <div className={s.cs}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link className={s.brand} href={PATH}>
            <BrandMark className={s.brandMark} />
            <div>
              <strong>Louis Rotellini</strong>
              <span>{t.brandRole}</span>
            </div>
          </Link>
          {mailButton(`${s.btn} ${s.btnPrimary}`)}
        </div>
      </header>

      <main id="top">
        <section className={s.hero} aria-labelledby="cession-titre">
          <div className={s.wrap}>
            <div className={s.eyebrow}>
              <b>{"//"}</b> {hero.eyebrow}
            </div>
            <h1 id="cession-titre">
              {hero.title} <em>{hero.titleAccent}</em>
            </h1>
            <p className={s.lead}>{hero.lead}</p>
            <div className={s.ctas}>
              {mailButton(`${s.btn} ${s.btnPrimary}`)}
              <a className={`${s.btn} ${s.btnGhost}`} href="#reprise">
                {hero.howCta} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className={s.chips}>
              {hero.chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.sec} aria-labelledby="cession-reprends">
          <div className={s.wrap}>
            <div className={s.secHead}>
              <div>
                <div className={s.eyebrow}>
                  <b>01</b> · {scope.eyebrow}
                </div>
                <h2 className={s.h2} id="cession-reprends">
                  {scope.title}
                </h2>
              </div>
              <p>{scope.intro}</p>
            </div>
            <div className={s.bento}>
              <div className={`${s.tile} ${s.tMain}`}>
                <div className={s.eyebrow}>{scope.maintenance.label}</div>
                <h3>{scope.maintenance.title}</h3>
                <ul className={s.ticks}>
                  {scope.maintenance.ticks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className={`${s.tile} ${s.tOne}`}>
                <div className={s.big} aria-hidden="true">
                  {scope.one.big}
                </div>
                <div>
                  <h3>
                    <span className="sr-only">{scope.one.big} </span>
                    {scope.one.title}
                  </h3>
                  <p>{scope.one.body}</p>
                </div>
              </div>
              <div className={`${s.tile} ${s.tThird}`}>
                <div className={s.eyebrow}>{scope.hosting.label}</div>
                <h3>{scope.hosting.title}</h3>
                <p>{scope.hosting.body}</p>
                <ul className={s.pills}>
                  {scope.hosting.pills.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className={`${s.tile} ${s.tThird}`}>
                <div className={s.eyebrow}>{scope.contracts.label}</div>
                <h3>{scope.contracts.title}</h3>
                <p>{scope.contracts.body}</p>
              </div>
              <div className={`${s.tile} ${s.tThird}`}>
                <div className={s.eyebrow}>{scope.tech.label}</div>
                <h3>{scope.tech.title}</h3>
                <p>{scope.tech.body}</p>
                <ul className={s.pills}>
                  {scope.tech.pills.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.bentoNote}>{scope.note}</p>
          </div>
        </section>

        <section className={s.sec} id="reprise" aria-labelledby="cession-etapes">
          <div className={s.wrap}>
            <div className={s.secHead}>
              <div>
                <div className={s.eyebrow}>
                  <b>02</b> · {steps.eyebrow}
                </div>
                <h2 className={s.h2} id="cession-etapes">
                  {steps.title}
                </h2>
              </div>
              <p>{steps.intro}</p>
            </div>
            <ol className={s.road}>
              {steps.items.map((step, i) => (
                <li key={step.title} className={step.paid ? s.money : undefined}>
                  <div className={s.roadDot} aria-hidden="true">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {step.paid ? <span className={s.euro}>{step.paid}</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.sec} aria-labelledby="cession-qui">
          <div className={`${s.wrap} ${s.about}`}>
            <figure className={s.portrait}>
              <Image
                src="/louis-rotellini.jpg"
                alt={about.portraitAlt}
                width={640}
                height={640}
                sizes="(max-width: 900px) 100vw, 440px"
              />
              <figcaption>
                <span>{about.caption[0]}</span>
                <span>{about.caption[1]}</span>
              </figcaption>
            </figure>
            <div className={s.aboutTxt}>
              <div className={s.eyebrow}>
                <b>03</b> · {about.eyebrow}
              </div>
              <h2 className={s.aboutH2} id="cession-qui">
                {about.title}
              </h2>
              <p>{about.body}</p>
              <div className={s.proofs}>
                <div className={s.proof}>
                  <div className={s.k}>{about.proofWp.k}</div>
                  <p>{about.proofWp.body}</p>
                </div>
                <div className={s.proof}>
                  <div className={s.k}>{plugins.k}</div>
                  <p>
                    {plugins.before}
                    <a href={plugins.links[0].href}>{plugins.links[0].label}</a>
                    {plugins.between}
                    <a href={plugins.links[1].href}>{plugins.links[1].label}</a>
                    {plugins.after}
                  </p>
                </div>
                <div className={s.proof}>
                  <div className={s.k}>{about.proofCms.k}</div>
                  <p>{about.proofCms.body}</p>
                </div>
              </div>
              <div className={s.logos}>
                <div className={s.logosL}>{about.logosLabel}</div>
                <ul className={s.logosRow}>
                  {LOGOS.map((l) => (
                    <li key={l.src}>
                      {/* SVG locaux : next/image n'apporterait rien (pas d'optimisation des SVG). */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={l.tall ? s.tall : undefined}
                        src={l.src}
                        alt={l.alt}
                        width={l.w}
                        height={l.h}
                        loading="lazy"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <Link className={s.folio} href="/">
                <div>
                  <div className={s.eyebrow}>
                    <b>{"//"}</b> {about.folio.eyebrow}
                  </div>
                  <strong>{about.folio.title}</strong>
                  <small>{about.folio.body}</small>
                </div>
                <span className={s.folioGo} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className={s.sec} aria-labelledby="cession-questions">
          <div className={`${s.wrap} ${s.faq}`}>
            <div>
              <div className={s.eyebrow}>
                <b>04</b> · {faq.eyebrow}
              </div>
              <h2 className={s.h2} id="cession-questions">
                {faq.title}
              </h2>
            </div>
            <div>
              {faq.items.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={s.ctaSec} aria-labelledby="cession-contact">
          <div className={s.wrap}>
            <div className={s.cta}>
              <div>
                <div className={s.eyebrow}>
                  <b>05</b> · {contact.eyebrow}
                </div>
                <h2 id="cession-contact">{contact.title}</h2>
                <p>{contact.body}</p>
              </div>
              <div>
                <ul>
                  {contact.list.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {mailButton(s.btn)}
                <p className={s.ctaHint}>{contact.hint}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.foot}>
        <div className={`${s.wrap} ${s.footIn}`}>
          <span>
            {footer.rights} ·{" "}
            <Link className={s.footLink} href="/mentions-legales">
              {footer.legal}
            </Link>
          </span>
          <span>{footer.email}</span>
        </div>
      </footer>
    </div>
  );
}
