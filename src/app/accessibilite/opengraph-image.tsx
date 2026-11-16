import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage : le titre de la page (son h1).
const TITLE = "Votre site marchand doit être accessible. Je corrige vos gabarits, au forfait.";

export const alt = TITLE;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(TITLE);
}
