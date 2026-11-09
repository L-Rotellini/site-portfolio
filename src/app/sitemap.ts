import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// évite new Date() qui change à chaque build
const lastModified = new Date("2026-07-08");
// mentions légales et /ceder-sa-clientele-web
const updatedNov2026 = new Date("2026-11-09");

// hreflang alternates : le FR vit à la racine, l'EN sous /en.
function alternates(frPath: string) {
  const enPath = frPath === "/" ? "/en" : `/en${frPath}`;
  return {
    languages: {
      "fr-FR": `${SITE_URL}${frPath}`,
      "en-US": `${SITE_URL}${enPath}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternates("/"),
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: alternates("/"),
    },
    {
      // Page française uniquement : pas d'alternate en.
      url: `${SITE_URL}/ceder-sa-clientele-web`,
      lastModified: updatedNov2026,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: updatedNov2026,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: alternates("/mentions-legales"),
    },
    {
      url: `${SITE_URL}/en/mentions-legales`,
      lastModified: updatedNov2026,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: alternates("/mentions-legales"),
    },
  ];
}
