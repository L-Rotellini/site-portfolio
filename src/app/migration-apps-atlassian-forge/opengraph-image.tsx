import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

// Image de partage : le titre de la page (son h1).
const TITLE =
  "Votre app Jira tourne encore sur Connect ? Je la migre vers Forge et je prouve qu'elle fait la même chose.";

export const alt = TITLE;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(TITLE);
}
