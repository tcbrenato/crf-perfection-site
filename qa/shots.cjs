const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2]; const url = process.argv[3] || 'http://localhost:4173/';
  const b = await chromium.launch();
  const errors = [];
  for (const w of [360, 768, 1024, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    p.on('console', (m) => { if (m.type() === 'error') errors.push(`${w}: ${m.text()}`); });
    p.on('pageerror', (e) => errors.push(`${w}: ${e.message}`));
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(400);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(w, 'overflow-x:', overflow, 'height:', await p.evaluate(() => document.body.scrollHeight));
    await p.screenshot({ path: `${out}/home-${w}.png`, fullPage: true });
    await p.close();
  }
  console.log('errors:', errors.length ? errors : 'none');
  await b.close();
})();
