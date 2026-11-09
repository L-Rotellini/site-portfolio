export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Préfixe d'URL selon la locale : FR à la racine (pas de préfixe), EN sous /en.
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

// Construit un lien interne localisé : localizedHref("fr", "/projets/x") => "/projets/x"
//                                       localizedHref("en", "/projets/x") => "/en/projets/x"
export function localizedHref(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

// Pages servies en français seulement : le sélecteur de langue renvoie vers
// l'accueil anglais au lieu d'une URL /en/... qui répondrait 404.
export const frOnlyPaths: readonly string[] = ["/ceder-sa-clientele-web"];

// Pages autonomes : elles rendent leur propre en-tête, <main> et pied de page, sans le menu
// du portfolio, la palette ⌘K ni les réglages de son et d'accent (voir SiteShell).
export const standalonePaths: readonly string[] = ["/ceder-sa-clientele-web"];

// Balise <html lang> / hreflang associée à chaque locale.
export const htmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export const hreflang: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
};
