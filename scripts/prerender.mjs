// Pré-rendu statique de chaque route (SEO) + sitemap.xml + robots.txt.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CLIENT = path.join(ROOT, 'dist/client');
const SITE_URL = 'https://crfperfection.pro';

const template = await readFile(path.join(CLIENT, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(ROOT, 'dist/server/entry-server.js')).href);

// Préchargement des polices les plus utilisées (latin 400, 700, 800).
const assets = await readdir(path.join(CLIENT, 'assets'));
const preload = ['400', '700', '800']
  .map((w) => assets.find((f) => f.startsWith(`inter-latin-${w}-normal`) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const indexables = [];
for (const route of routes) {
  const { html, head, noindex } = render(route);
  const page = template
    .replace('<!--head-->', `${preload}\n    ${head}`)
    .replace('<!--app-->', html);
  const file = route === '/404' ? path.join(CLIENT, '404.html') : path.join(CLIENT, route, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  if (!noindex && route !== '/404') indexables.push(route);
}

const today = new Date().toISOString().slice(0, 10);
await writeFile(path.join(CLIENT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexables
    .map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(CLIENT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`pré-rendu : ${routes.length} pages (${indexables.length} indexables)`);
