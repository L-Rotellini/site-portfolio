import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage : le titre de la page (son h1).
const TITLE = "Vous arrêtez votre activité web ? Je reprends vos clients et leurs sites.";

export const alt = TITLE;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(TITLE);
}
