import type { Metadata } from "next";

export const SITE_URL = "https://www.louisrotellini.fr";
export const EMAIL = "louis.rotellini@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/louis-rotellini/";
export const GITHUB_URL = "https://github.com/L-Rotellini";

// Métadonnées d'une page : titre du prototype, description reprise d'une phrase de la page,
// URL canonique. L'image de partage vient du fichier opengraph-image.tsx de la route.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: path,
      siteName: "Louis Rotellini",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@louisrotellini",
      creator: "@louisrotellini",
      title,
      description,
    },
  };
}
