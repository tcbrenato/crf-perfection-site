// Génère les variantes AVIF/WebP responsives des photos de images/source et images/catalogue-pdf.
// Sortie : public/img/<nom>-<largeur>.<ext> + src/generated/images.json (dimensions, pour srcset et ratio).
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SOURCES = ['images/source', 'images/catalogue-pdf'];
const OUT = path.join(ROOT, 'public/img');
const WIDTHS = [480, 960, 1600, 2400];

await mkdir(OUT, { recursive: true });
await mkdir(path.join(ROOT, 'src/generated'), { recursive: true });
const manifest = {};

for (const dir of SOURCES) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) continue;
  for (const file of (await readdir(abs)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
    const name = (dir.endsWith('catalogue-pdf') ? 'pdf-' : '') + file.replace(/\.(jpe?g|png)$/i, '');
    const src = path.join(abs, file);
    const meta = await sharp(src).rotate().metadata();
    const w0 = meta.autoOrient?.width ?? meta.width;
    const h0 = meta.autoOrient?.height ?? meta.height;
    const widths = WIDTHS.filter((w) => w < w0).concat(w0 <= WIDTHS.at(-1) ? [w0] : []);
    for (const w of widths) {
      for (const [ext, opts] of [['avif', { quality: 52 }], ['webp', { quality: 74 }]]) {
        const out = path.join(OUT, `${name}-${w}.${ext}`);
        if (existsSync(out)) continue; // déjà générée (cache CI : les dates de fichiers ne sont pas fiables après checkout)
        await sharp(src).rotate().resize({ width: w }).toFormat(ext, opts).toFile(out);
      }
    }
    manifest[name] = { w: w0, h: h0, widths };
  }
}
await writeFile(path.join(ROOT, 'src/generated/images.json'), JSON.stringify(manifest, null, 1));
console.log(`images : ${Object.keys(manifest).length} sources`);
