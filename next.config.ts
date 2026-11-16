import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Headers statiques appliqués à toutes les routes. La CSP (à nonce, donc
// dépendante de la requête) est posée dans le middleware.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HSTS seulement en prod (éviter d'épingler HTTPS sur localhost).
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  images: {
    // 384 et 512 en tête de deviceSizes : les vignettes .page__shot (268 à 348 px affichés) ont une
    // variante proche de leur taille, même si sizes contient « vw » (next/image retire alors du srcset
    // tout ce qui est sous deviceSizes[0]). 384 quitte imageSizes pour ne pas être en double.
    deviceSizes: [384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Autorise le rendu des placeholders SVG (logo fourmi) via next/image.
    // Neutralisé par une CSP sandbox dédiée : aucun script ne peut s'exécuter.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/mentions-legale",
        destination: "/mentions-legales",
        permanent: true, // 308
      },
      // Les anciennes pages projets détaillées n'existent plus.
      {
        source: "/projets/:id",
        destination: "/",
        permanent: true,
      },
      // Refonte : le site est en français seulement. /en et ses sous-pages renvoient vers leur
      // équivalent français par une redirection temporaire (307), pour rester réversible.
      {
        source: "/en/projets/:id",
        destination: "/",
        permanent: false,
      },
      {
        source: "/en",
        destination: "/",
        permanent: false,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: false,
      },
      // /fr n'a jamais été une adresse publique : il renvoie vers l'adresse sans préfixe.
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
