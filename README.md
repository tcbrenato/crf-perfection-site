# Site CRF Perfection (crfperfection.pro)

React + Vite + React Router, pré-rendu statique de chaque route, déploiement Hostinger.

```bash
npm install
npm run dev        # développement
npm run build      # images + build client + build SSR + pré-rendu → dist/client
```

- `content/` : tous les textes et données (catalogue 2027 = source unique).
- `scripts/extract-catalogue.py` : extraction du Word (`source/`) vers `content/catalogue/formations.raw.json`.
- `scripts/images.mjs` : variantes AVIF/WebP responsives.
- `docs/` : sitemap, questions ouvertes.
