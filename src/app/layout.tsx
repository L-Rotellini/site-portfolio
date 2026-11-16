import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";
import "./site.css";

// Police auto-hébergée par next/font : la CSP du middleware (font-src 'self') interdit le
// lien Google Fonts du prototype. Même famille et mêmes axes (opsz, wght) que le prototype.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Louis Rotellini", url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Louis Rotellini",
  jobTitle: "Développeur full-stack freelance",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  image: `${SITE_URL}/louis-rotellini.jpg`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  address: { "@type": "PostalAddress", addressLocality: "Lille", addressCountry: "FR" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Lire l'en-tête rend chaque page à la requête : Next pose alors le nonce de la CSP
  // (middleware.ts) sur ses propres scripts.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="fr" className={bricolage.variable}>
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
