import type { Metadata, Viewport } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import UiProvider from "@/components/UiProvider";
import SiteShell from "@/components/SiteShell";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommandPalette from "@/components/CommandPalette";
import { SITE_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import {
  defaultLocale,
  htmlLang,
  hreflang,
  isLocale,
  localePrefix,
  ogLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport: Viewport = {
  // Le contenu passe sous la barre de statut / l'indicateur home (iOS).
  viewportFit: "cover",
  // Valeur SSR = thème clair par défaut ; UiProvider la resynchronise en sombre.
  themeColor: "#fcfbf8",
};

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
  const home = localePrefix(locale) || "/";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s | Louis Rotellini",
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: "Louis Rotellini", url: SITE_URL }],
    alternates: {
      canonical: home,
      languages: {
        "fr-FR": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: home,
      siteName: "Louis Rotellini",
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      // og:image fourni par [locale]/opengraph-image.tsx (généré via next/og).
    },
    twitter: {
      card: "summary_large_image",
      site: "@louisrotellini",
      creator: "@louisrotellini",
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      // twitter:image fourni par [locale]/twitter-image.tsx.
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const home = localePrefix(locale) || "/";
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Louis Rotellini",
    jobTitle: dict.meta.jobTitle,
    description: dict.meta.personDescription,
    url: `${SITE_URL}${localePrefix(locale)}`,
    email: `mailto:${EMAIL}`,
    image: `${SITE_URL}/louis-rotellini.jpg`,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: dict.meta.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lille",
      addressRegion: "Hauts-de-France",
      addressCountry: "FR",
    },
    inLanguage: hreflang[locale],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: dict.meta.serviceName,
    url: `${SITE_URL}${localePrefix(locale)}`,
    areaServed: ["FR", "Europe"],
    description: dict.meta.serviceDescription,
    serviceType: dict.meta.serviceTypes,
  };

  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={[GeistSans.variable, GeistMono.variable, bricolage.variable].join(" ")}
    >
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        {/* Marque le support JS (fallback reveal no-JS) + accent persisté,
            appliqués avant la peinture pour éviter tout flash. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{var a=localStorage.getItem("accent");if(a&&/^#[0-9A-Fa-f]{6}$/.test(a))document.documentElement.style.setProperty("--accent",a)}catch(e){}`,
          }}
        />

        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} nonce={nonce}>
          <UiProvider>
            <SiteShell
              header={<SiteHeader dict={dict.nav} banner={dict.agentBanner} locale={locale} home={home} />}
              footer={<SiteFooter dict={dict.footer} locale={locale} />}
              overlay={
                <CommandPalette
                  dict={dict.palette}
                  copiedMsg={dict.contact.copied}
                  locale={locale}
                  home={home}
                />
              }
            >
              {children}
            </SiteShell>
          </UiProvider>
        </ThemeProvider>

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
      <Script id="console-signature" strategy="afterInteractive" nonce={nonce}>
        {`
            const styleHeader = [
              "color: #16150F",
              "background: #ECE9DE",
              "font-size: 14px",
              "padding: 6px 10px",
              "border-radius: 4px",
              "font-weight: 600",
            ].join(";");
            const styleBody = [
              "color: #6E6B60",
              "font-size: 13px",
            ].join(";");

            console.log("%c" + ${JSON.stringify(dict.meta.consoleTitle)}, styleHeader);
            console.log("%c" + ${JSON.stringify(dict.meta.consolePortfolio)}, styleBody);
            console.log("%c" + ${JSON.stringify(dict.meta.consoleSpecialties)}, styleBody);
          `}
      </Script>
    </html>
  );
}
