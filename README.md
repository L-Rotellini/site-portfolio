# 🧑‍💻 Portfolio – Louis ROTELLINI

> Le site de Louis Rotellini, en français : six pages portées du prototype de `docs/refonte/` (la note de cadrage fait foi).

---

## 🚀 Stack principale

- [Next.js](https://nextjs.org) 15 – App Router, une route par page, CSP à nonce dans `src/middleware.ts`
- [React](https://react.dev) 19
- Une seule feuille de style, `src/app/site.css`, reprise du prototype
- Bricolage Grotesque auto-hébergée par `next/font`

---

## 🖥️ Aperçu

**Démo en ligne :** [https://www.louisrotellini.fr](https://www.louisrotellini.fr)

---

## 🧰 Installation & développement

# 1. Cloner le projet
git clone https://github.com/L-Rotellini/site-portfolio.git
cd site-portfolio

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur local
npm run dev

Puis ouvre http://localhost:3000 dans ton navigateur 🚀

---

## ⚙️ Scripts disponibles

| Commande            | Description                         |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Lance le serveur de développement   |
| `npm run build`     | Crée la build de production         |
| `npm run start`     | Lance la version compilée           |
| `npm run lint`      | Vérifie le code avec ESLint         |
| `npm run lint:fix`  | Corrige automatiquement les erreurs |
| `npm run typecheck` | Vérifie les types TypeScript        |



---

## 🌟 Pages

| Route | Prototype |
| --- | --- |
| `/` | `Accueil.html` |
| `/ia` | `IA.html` |
| `/accessibilite` | `Accessibilite.html` |
| `/maintenance-site-wordpress` | `Maintenance.html` |
| `/ceder-sa-clientele-web` | `Ceder.html` |
| `/migration-apps-atlassian-forge` | `Migration-Forge.html` |
| `/mentions-legales` | `Mentions-legales.html` |

`/en` et ses sous-pages redirigent (307) vers leur équivalent français. Le téléphone n'apparaît en clair que sur `/mentions-legales`.

---

## 🧠 À propos

Je suis Louis ROTELLINI, développeur front-end passionné par les interfaces modernes, les performances web et l’expérience utilisateur.
Ce portfolio est à la fois un projet vitrine et un laboratoire pour expérimenter les dernières technologies de l’écosystème React et Next.js.

📫 Contact : louis.rotellini@gmail.com

🌐 Site : https://www.louisrotellini.fr

💼 LinkedIn : https://www.linkedin.com/in/louis-rotellini/

🐙 GitHub : https://github.com/L-Rotellini
