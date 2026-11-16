// Pour chaque capture .page__shot : largeur affichée, sizes, variante réellement chargée (currentSrc).
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:3100';
const PAGES = ['/', '/ia', '/maintenance-site-wordpress', '/ceder-sa-clientele-web'];
const CASES = [
  { label: '390 px, DPR 3 (iPhone)', width: 390, height: 844, dpr: 3 },
  { label: '390 px, DPR 1', width: 390, height: 844, dpr: 1 },
  { label: '768 px, DPR 2', width: 768, height: 1024, dpr: 2 },
  { label: '1280 px, DPR 1', width: 1280, height: 800, dpr: 1 },
  { label: '1280 px, DPR 2', width: 1280, height: 800, dpr: 2 },
];
(async () => {
  const b = await chromium.launch();
  const rows = [];
  for (const c of CASES) {
    for (const path of PAGES) {
      const ctx = await b.newContext({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: c.dpr });
      const p = await ctx.newPage();
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      // Fait défiler pour déclencher le chargement paresseux de chaque capture.
      const n = await p.locator('.page__shot img').count();
      for (let i = 0; i < n; i++) {
        const img = p.locator('.page__shot img').nth(i);
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => (el.complete ? null : new Promise((r) => el.addEventListener('load', r, { once: true }))));
      }
      const data = await p.$$eval('.page__shot img', (imgs) =>
        imgs.map((el) => ({
          img: decodeURIComponent((el.currentSrc.match(/url=([^&]+)/) || [])[1] || el.currentSrc).split('/').pop(),
          affiche: Math.round(el.getBoundingClientRect().width),
          w: Number((el.currentSrc.match(/[?&]w=(\d+)/) || [])[1]),
          sizes: el.getAttribute('sizes'),
        })));
      for (const d of data) rows.push({ cas: c.label, dpr: c.dpr, page: path, ...d });
      await ctx.close();
    }
  }
  await b.close();
  console.log(JSON.stringify(rows));
})();
