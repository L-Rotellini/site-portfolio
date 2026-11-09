import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage reprise des autres pages : un openGraph/twitter défini dans
// page.tsx efface les images héritées de [locale]/twitter-image.
export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export const alt = "Louis Rotellini, AI Product Engineer";
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderOgImage();
}
