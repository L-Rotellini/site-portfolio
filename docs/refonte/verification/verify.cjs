// Vérification de la refonte : prototype (localhost:3200) contre build de production (localhost:3100).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });
const PROTO = 'http://localhost:3200/';
const SITE = process.env.SITE || 'http://localhost:3100';
const PAGES = [
  ['/', 'Accueil.html'],
  ['/ia', 'IA.html'],
  ['/accessibilite', 'Accessibilite.html'],
  ['/maintenance-site-wordpress', 'Maintenance.html'],
  ['/ceder-sa-clientele-web', 'Ceder.html'],
  ['/mentions-legales', 'Mentions-legales.html'],
];
const FONT_CSS = `@font-face{font-family:'Bricolage Grotesque';font-style:normal;font-weight:200 800;font-display:swap;src:url(${PROTO}font.woff2) format('woff2')}`;

// Liens internes du prototype -> routes du site.
function mapProtoHref(href, route) {
  const m = { 'Accueil.html': '/', 'IA.html': '/ia', 'Mentions-legales.html': '/mentions-legales', 'Accueil.html#contact': '/#contact' };
  if (href in m) return m[href];
  if (href === '#') return route; // marque de l'en-tête (« # » dans le prototype)
  return href;
}

async function extract(page) {
  return page.evaluate(() => {
    const text = document.body.innerText.split('\n').map((l) => l.replace(/[ \t\r]+/g, ' ').trim()).filter(Boolean);
    const links = [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim() }));
    return { text, links, title: document.title };
  });
}

(async () => {
  const browser = await chromium.launch();
  const report = { pages: {}, csp: {}, keyboard: {}, phone: {} };

  for (const [route, file] of PAGES) {
    const r = { };
    for (const [kind, url] of [['proto', PROTO + file], ['site', SITE + route]]) {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      await ctx.route('https://fonts.googleapis.com/**', (rt) => rt.fulfill({ contentType: 'text/css', body: FONT_CSS }));
      await ctx.route('https://fonts.gstatic.com/**', (rt) => rt.abort());
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
      page.on('pageerror', (e) => errors.push('pageerror ' + e.message));
      await page.addInitScript(() => document.addEventListener('securitypolicyviolation', (e) => console.error('CSP violation: ' + e.violatedDirective + ' ' + e.blockedURI)));
      const resp = await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      if (kind === 'site') {
        r.status = resp.status();
        r.csp = (resp.headers()['content-security-policy'] || '').slice(0, 60);
        r.consoleErrors = errors;
      }
      for (const w of [1280, 390]) {
        await page.setViewportSize({ width: w, height: 800 });
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}/${kind}${route === '/' ? '-accueil' : route.replace(/\//g, '-')}-${w}.png`, fullPage: true });
      }
      r[kind] = await extract(page);
      await ctx.close();
    }
    // Texte
    const a = r.proto.text, b = r.site.text;
    const diff = [];
    let i = 0, j = 0;
    while (i < a.length || j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      // ligne en plus côté site ?
      if (b.slice(j + 1).length && a[i] === b[j + 1]) { diff.push(`+ site : ${b[j]}`); j++; continue; }
      if (a.slice(i + 1).length && a[i + 1] === b[j]) { diff.push(`- proto : ${a[i]}`); i++; continue; }
      diff.push(`~ proto : ${a[i]}\n~ site  : ${b[j]}`); i++; j++;
      if (diff.length > 30) break;
    }
    // Liens
    const protoLinks = r.proto.links.map((l) => mapProtoHref(l.href, route) + ' | ' + l.text);
    const siteLinks = r.site.links.map((l) => l.href + ' | ' + l.text);
    const linkDiff = {
      absentsDuSite: protoLinks.filter((l) => !siteLinks.includes(l)),
      enPlusSurLeSite: siteLinks.filter((l) => !protoLinks.includes(l)),
    };
    report.pages[route] = {
      status: r.status, csp: r.csp, consoleErrors: r.consoleErrors,
      titleProto: r.proto.title, titleSite: r.site.title,
      lignesProto: a.length, lignesSite: b.length, ecartsTexte: diff, linkDiff,
      internalLinks: [...new Set(r.site.links.map((l) => l.href).filter((h) => h.startsWith('/')))],
    };
  }

  // Liens internes : chaque cible répond 200.
  report.internal = {};
  const all = new Set(Object.values(report.pages).flatMap((p) => p.internalLinks));
  for (const h of all) {
    const res = await fetch(SITE + h, { redirect: 'manual' });
    report.internal[h] = res.status;
  }

  // Téléphone : clic, lien tel:, focus.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(SITE + '/maintenance-site-wordpress', { waitUntil: 'networkidle' });
    const before = await page.locator('a[href^="tel:"]').count();
    await page.getByRole('button', { name: 'Afficher mon numéro de téléphone' }).click();
    const tel = page.locator('a[href^="tel:"]');
    report.phone = {
      liensTelAvantClic: before,
      href: await tel.getAttribute('href'),
      texte: await tel.textContent(),
      focusSurLeLien: await page.evaluate(() => document.activeElement?.getAttribute('href')),
    };
    await page.locator('#contact').screenshot({ path: `${OUT}/telephone-apres-clic.png` });
    await ctx.close();
  }

  // Clavier : lien d'évitement, focus visible, <details>, bouton du téléphone au clavier.
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(SITE + '/ceder-sa-clientele-web', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => { const e = document.activeElement; const r = e.getBoundingClientRect(); return { text: e.textContent, left: r.left, outline: getComputedStyle(e).outlineStyle }; });
    await page.screenshot({ path: `${OUT}/clavier-lien-evitement.png`, clip: { x: 0, y: 0, width: 640, height: 120 } });
    await page.keyboard.press('Enter');
    const hash = await page.evaluate(() => location.hash);
    await page.locator('summary').first().focus();
    const summaryOutline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    await page.keyboard.press('Enter');
    const open = await page.evaluate(() => document.querySelector('details').open);
    await page.locator('summary').first().screenshot({ path: `${OUT}/clavier-faq.png` });
    report.keyboard.cession = { skip, hashApresEntree: hash, summaryOutline, detailsOuvertAuClavier: open };
    await page.goto(SITE + '/maintenance-site-wordpress', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Afficher mon numéro de téléphone' }).focus();
    await page.keyboard.press('Enter');
    report.keyboard.telephone = await page.evaluate(() => ({ focus: document.activeElement.getAttribute('href'), outline: getComputedStyle(document.activeElement).outlineStyle }));
    await ctx.close();
  }

  // Démo /ia : un verdict s'affiche, sans violation de CSP.

  await browser.close();
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})();
