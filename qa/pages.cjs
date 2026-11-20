const { chromium } = require('playwright');
const pages = ['/', '/catalogue-2027/', '/formations/t2-cyber-resilience-portuaire/', '/inscription/', '/contact/', '/copaf/', '/qui-sommes-nous/', '/nos-activites/', '/formations-sur-mesure/', '/nos-activites/diagnostic-conseil/', '/nos-activites/recherche-appliquee/', '/mentions-legales/', '/n-existe-pas'];
(async () => {
  const out = process.argv[2]; const b = await chromium.launch(); const errs = [];
  for (const w of [360, 1440]) for (const path of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    p.on('pageerror', (e) => errs.push(`${w} ${path}: ${e.message}`));
    p.on('console', (m) => { if (m.type() === 'error') errs.push(`${w} ${path}: ${m.text()}`); });
    await p.goto('http://localhost:4173' + path, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => ({ ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, h1: document.querySelectorAll('h1').length, noalt: [...document.images].filter(i => !i.hasAttribute('alt')).length }));
    if (r.ov || r.h1 !== 1 || r.noalt) console.log('PROBLEME', w, path, JSON.stringify(r));
    const name = (path.replace(/\//g, '_') || '_') + '-' + w + '.png';
    await p.screenshot({ path: `${out}/${name}`, fullPage: w === 1440 });
    await p.close();
  }
  console.log('erreurs:', errs.length ? errs : 'aucune'); await b.close();
})();
