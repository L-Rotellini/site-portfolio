import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Date fixe : new Date() changerait à chaque build. Mise en ligne de la refonte.
const lastModified = new Date("2026-11-16");

const PAGES: {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  lastModified?: Date;
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/ia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/accessibilite", priority: 0.7, changeFrequency: "monthly" },
  { path: "/maintenance-site-wordpress", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ceder-sa-clientele-web", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/migration-apps-atlassian-forge",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: new Date("2026-11-20"),
  },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority, changeFrequency, lastModified: modified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: modified ?? lastModified,
    changeFrequency,
    priority,
  }));
}
