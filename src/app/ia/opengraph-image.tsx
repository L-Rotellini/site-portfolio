import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage : le titre de la page (son h1).
const TITLE = "Je conçois et mets en production des outils IA pour des usages métier concrets.";

export const alt = TITLE;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(TITLE);
}
