import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { SITE } from '@content/site';

export interface HeadData {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object[];
  noindex?: boolean;
  lang?: 'fr' | 'en';
}

/** Collecteur utilisé par le pré-rendu ; côté navigateur, on met à jour le document. */
export const HeadContext = createContext<{ data?: HeadData } | null>(null);

export function HeadProvider({ store, children }: { store: { data?: HeadData }; children: ReactNode }) {
  return <HeadContext.Provider value={store}>{children}</HeadContext.Provider>;
}

export const fullTitle = (t: string) => (t.includes(SITE.nom) ? t : `${t} | ${SITE.nom}`);

export function Seo(props: HeadData) {
  const store = useContext(HeadContext);
  if (store) store.data = props;
  useEffect(() => {
    document.title = fullTitle(props.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', props.description);
  }, [props.title, props.description]);
  return null;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Balises <head> pour le HTML pré-rendu. */
export function renderHead(d: HeadData): string {
  const url = SITE.url + d.path;
  const image = SITE.url + (d.image ?? '/og/crf-perfection-og.jpg');
  const tags = [
    `<title>${esc(fullTitle(d.title))}</title>`,
    `<meta name="description" content="${esc(d.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    d.noindex ? '<meta name="robots" content="noindex, nofollow" />' : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.nom}" />`,
    `<meta property="og:locale" content="${d.lang === 'en' ? 'en_US' : 'fr_FR'}" />`,
    `<meta property="og:title" content="${esc(fullTitle(d.title))}" />`,
    `<meta property="og:description" content="${esc(d.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(d.jsonLd ?? []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}
