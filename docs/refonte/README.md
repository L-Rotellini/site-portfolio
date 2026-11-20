# Refonte de louisrotellini.fr : note de cadrage

Le site est refondu en entier, a partir d'un prototype valide page par page par Louis. Le prototype est dans `docs/refonte/prototype/` : six pages HTML statiques et une feuille `site.css`. **Il fait foi sur le texte, la structure, l'ordre des sections et le style.** Le travail est un portage vers Next.js, pas une nouvelle conception.

## Les pages

| Route | Fichier du prototype | Lecteur | Langue |
| --- | --- | --- | --- |
| `/` | `Accueil.html` | enseignes, grands comptes, agences de communication | fr |
| `/ia` | `IA.html` | recruteurs (le CV et LinkedIn y pointent) | fr |
| `/accessibilite` | `Accessibilite.html` | e-commercants tenus a l'accessibilite | fr |
| `/maintenance-site-wordpress` | `Maintenance.html` | TPE et associations sous WordPress, amenees par un cedant | fr |
| `/ceder-sa-clientele-web` | `Ceder.html` | prestataires web qui cedent leur clientele | fr |
| `/mentions-legales` | `Mentions-legales.html` | tous | fr |
| `/migration-apps-atlassian-forge` | `Migration-Forge.html` | entreprises francaises avec une app Jira ou Confluence maison sur Connect (ajoutee le 20/11/2026, hors menu de l'accueil) | fr |

Le `<title>` de chaque page reprend celui du prototype, « louisrotellini.fr » y etant remplace par « Louis Rotellini » ; celui de `/ia` est « Louis Rotellini · AI Product Engineer a Lille » ; celui de l'accueil devient « Louis Rotellini · developpeur full-stack freelance a Lille » (avec accents). Chaque page a sa description, son URL canonique et son image Open Graph dans le nouveau style (noir sur blanc, fourmi, titre de la page).

## Decisions

- **Texte a l'identique.** Aucun mot du prototype ne change, n'est ajoute ni retire, accents et ponctuation compris. Un texte qui semble faux se signale dans la PR, il ne se corrige pas.
- **Style a l'identique.** Variables, tailles, espacements et points de rupture de `site.css` sont repris tels quels. Une seule feuille commune ; `cession.module.css` disparait. Noir sur blanc, aucune couleur d'accent, aucune animation, pas de theme sombre.
- **Une seule famille : Bricolage Grotesque**, chargee par `next/font/google` (auto-hebergee). La CSP du middleware (`font-src 'self'`, `style-src`) interdit le lien Google Fonts du prototype.
- **Le site est en francais seulement.** `/en` et ses sous-pages disparaissent et redirigent vers leur equivalent francais par une redirection **temporaire** (`permanent: false`), pour rester reversible. Le dictionnaire `en.ts`, les `hreflang` et les alternates du sitemap partent.
- **Liens entre pages : ceux du prototype, rien de plus.** `Accueil.html` devient `/`, `IA.html` devient `/ia`, `Mentions-legales.html` devient `/mentions-legales`. Les `href="#"` de la marque en en-tete pointent vers la page elle-meme sur Maintenance et Ceder (ces deux pages ne menent pas a l'accueil par l'en-tete), vers `/` ailleurs. L'accueil ne lie ni `/maintenance-site-wordpress` ni `/ceder-sa-clientele-web` ni `/accessibilite`.
- **Les `noindex` du prototype ne sont pas repris.** Les six pages sont indexables et entrent dans `sitemap.ts`.
- **Telephone.** Il n'apparait en clair dans le HTML servi que sur `/mentions-legales` (obligation legale). Sur `/maintenance-site-wordpress`, le bouton « Afficher mon numero de telephone » du prototype devient un composant client : le numero n'est ni dans le HTML initial ni en clair dans le bundle (meme principe d'assemblage que le script du prototype), le lien `tel:` recoit le focus apres le clic.
- **Pas de demo sur `/ia`.** La demo « gate d'eval » et sa route `/api/gate` ont ete retirees le 16/11/2026 : le site n'appelle plus aucune API et n'a plus de cle a tenir.
- **Mentions legales.** Le texte du prototype fait foi.
- **Images.** `prod/…` dans le prototype correspond a `public/…` du depot (memes fichiers). Les captures de `docs/refonte/prototype/travaux/` vont dans `public/travaux/`. Toutes passent par `next/image` avec largeur, hauteur et `alt` du prototype.
- **Deux captures manquent au depot** : `travaux/decathlon-location-velo-lille.jpg` (la page https://www.decathlon.fr/location-velo-lille_lp-W7DKMI) et `travaux/damart-be-fetes-fr.jpg` (l'accueil de https://www.damart.be/fr_be). Les capturer avec Playwright en 1280 de large, haut de page, sans bandeau de cookies, au meme rapport que les autres captures de `.page__shot`. Si le site bloque la capture, poser a la place le carre de texte `.page__shot--txt` (« Decathlon », « Damart ») et le dire dans la PR : Louis fournira les fichiers.
- **Ce qui part du depot** : les composants de l'ancien one-page (`Hero`, `Manifesto`, `MachineSection`, `WorkSection`, `ApproachSection`, `AboutSection`, `ContactSection`, `CommandPalette`, `UiProvider`, `SiteShell` et ce qui ne sert plus), `src/data/products.ts` et ses traductions, les dependances devenues inutiles (`framer-motion`, `next-themes`, `geist`, `prism-react-renderer`, `lucide-react` si plus rien ne les importe). `archive/` ne bouge pas.
- **Ce qui reste** : les en-tetes de securite de `next.config.ts`, la CSP a nonce du middleware, Vercel Analytics, les redirections existantes (`/mentions-legale`, `/projets/:id` vers `/`).

## Etat d'arrivee

- Les six routes rendent le prototype, texte et mise en page, de 360 a 1440 px de large.
- `npm run lint`, `npm run typecheck` et `npm run build` passent.
- Aucune violation de CSP dans la console sur aucune page, en build de production.
- Navigation au clavier : lien d'evitement, focus visible, `<details>` de la foire aux questions, bouton du telephone.

## Verification, a porter dans la PR

1. **Texte** : un script extrait le texte visible du `<main>` de chaque page du prototype et de la page rendue, et les compare ; la PR montre zero ecart.
2. **Captures** Playwright de chaque page a 390 et 1280 px, a cote de la capture du fichier du prototype au meme format.
3. **Liens** : chaque lien externe du prototype est present avec la meme adresse ; chaque lien interne repond 200.
4. **Telephone** : `curl` de `/`, `/ia`, `/accessibilite`, `/ceder-sa-clientele-web` et `/maintenance-site-wordpress` ne contient aucune suite de chiffres du numero ; un test Playwright clique le bouton et lit le lien `tel:`.
5. **Redirections** : `/en` et `/en/mentions-legales` repondent 307 vers `/` et `/mentions-legales`.
6. Apres la mise en production : les six adresses repondent 200 sur https://louisrotellini.fr.

## Hors perimetre

- Toute retouche de texte, de prix ou de positionnement.
- Le CV, LinkedIn, antwork.fr.
