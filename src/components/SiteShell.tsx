"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useUi } from "@/components/UiProvider";
import { standalonePaths } from "@/i18n/config";

// Habillage du portfolio (en-tête, <main id="top">, pied de page, palette ⌘K).
// Décidé côté client avec usePathname : le layout [locale] persiste entre deux navigations,
// il ne peut donc pas choisir l'habillage une fois pour toutes au rendu serveur.
// Les pages autonomes (standalonePaths, URL française sans préfixe) rendent le leur.
export default function SiteShell({
  header,
  footer,
  overlay,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  overlay: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const standalone = standalonePaths.includes(pathname.replace(/\/$/, ""));
  const { agentView, toggleAgentView } = useUi();

  // La vue agent n'a pas de bouton de sortie sur une page autonome : on la quitte en y arrivant.
  useEffect(() => {
    if (standalone && agentView) toggleAgentView();
  }, [standalone, agentView, toggleAgentView]);

  if (standalone) return <>{children}</>;

  return (
    <>
      {header}
      <main id="top">{children}</main>
      {footer}
      {overlay}
    </>
  );
}
