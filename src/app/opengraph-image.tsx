import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage : le titre de la page (son h1).
const TITLE = "Je développe vos pages, vos sites et vos applications web, de la conception à la mise en ligne.";

export const alt = TITLE;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(TITLE);
}
