/**
 * Source unique du catalogue 2027 : fiches, liste, filtres, calendrier, sitemap, formulaire d'inscription.
 * Textes : Word « CRF_Perfection_Catalogue_Formation_2027_Finalisé.docx » (extraction automatique).
 */
import raw from './formations.raw.json';
import { META, MODULES_WORD } from './meta';
import type { Famille, FicheWord, Formation, Profil, Format } from './types';

export * from './types';

/** Brief : partout où le Word dit « Thème n » ou « Module A/B », on affiche le code. */
const codifier = (t: string): string =>
  t.replace(/\bThème (\d)\b/g, 'T$1').replace(/\bthématique (\d)\b/g, 'T$1')
    .replace(/\bModule A\b/g, 'W1').replace(/\bModule B\b/g, 'W2');

const codifierFiche = (f: FicheWord): FicheWord => {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(f)) {
    if (k === 'titreWord' || k === 'code') out[k] = v;
    else if (typeof v === 'string') out[k] = codifier(v);
    else if (Array.isArray(v)) out[k] = v.map((x) => codifier(String(x)));
    else out[k] = v;
  }
  return out as unknown as FicheWord;
};

const ORDRE: Famille[] = ['T', 'W', 'C', 'B'];

const fiches: FicheWord[] = [
  ...(raw as FicheWord[]).filter((f) => f.code.startsWith('T')),
  ...MODULES_WORD,
  ...(raw as FicheWord[]).filter((f) => !f.code.startsWith('T')),
];

export const FORMATIONS: Formation[] = fiches.map((f) => {
  const meta = META[f.code];
  if (!meta) throw new Error(`Métadonnées manquantes pour ${f.code}`);
  const famille = f.code[0] as Famille;
  return {
    ...codifierFiche(f),
    ...meta,
    famille,
    reference: `CRF-27-${f.code}`,
    surDevis: famille === 'B',
  };
}).sort((a, b) => ORDRE.indexOf(a.famille) - ORDRE.indexOf(b.famille) || Number(a.code.slice(1)) - Number(b.code.slice(1)));

export const parCode = (code: string): Formation | undefined =>
  FORMATIONS.find((f) => f.code.toLowerCase() === code.toLowerCase());

export const parSlug = (slug: string): Formation | undefined => FORMATIONS.find((f) => f.slug === slug);

export const FAMILLES: Record<Famille, { nom: string; court: string; ancre: string; intro: string; detail?: string }> = {
  T: {
    nom: 'Catalogue à la carte',
    court: 'Catalogue T',
    ancre: 'catalogue-a-la-carte',
    intro: 'Cinq formations pour cinq cibles.',
    detail: "Fort de plus de dix ans d'expérience dans la formation à grande échelle et le perfectionnement des cadres, CRF Perfection publie son catalogue spécialisé 2027, structuré par profil décisionnel : directeurs généraux, directeurs commerciaux et marketing, directeurs des ressources humaines, autres cadres. L'IA appliquée aux terminaux, la gestion des risques cyber et le leadership de la transformation y sont transversaux.",
  },
  W: {
    nom: 'Modules webinaires',
    court: 'Webinaires W',
    ancre: 'webinaires',
    intro: "Deux modules d'une journée webinaire.",
  },
  C: {
    nom: 'Série COPAF',
    court: 'Série COPAF C',
    ancre: 'serie-copaf',
    intro: 'Neuf programmes issus de la COPAF 2026.',
    detail: 'Chaque programme prolonge une session de la COPAF 2026 : diagnostic de maturité, ROI, gouvernance des données, escales, sûreté, cybersécurité industrielle, système communautaire, coopération.',
  },
  B: {
    nom: 'Séries par projet de port',
    court: 'Sur mesure B',
    ancre: 'sur-mesure',
    intro: 'Six programmes sur mesure.',
    detail: 'Chaque programme répond à un type de projet que les ports africains annoncent publiquement : port en eaux profondes, concessions, modernisation, ports secs, flux numériques, décarbonation.',
  },
};

export const PROFILS: Record<Profil, string> = {
  dg: 'Directions générales & Board',
  dsi: 'DSI & numérique',
  commercial: 'Commercial & marketing',
  drh: 'Ressources humaines',
  exploitation: 'Exploitation & autres cadres',
};

export const FORMATS: Record<Format, string> = {
  presentiel: 'Présentiel',
  'en-ligne': 'En ligne',
  'in-house': 'In-house (sur site)',
};

/** Toutes les sessions datées, triées. */
export const SESSIONS = FORMATIONS.flatMap((f) => f.sessions.map((s) => ({ formation: f, session: s })))
  .sort((a, b) => a.session.debut.localeCompare(b.session.debut) || a.formation.code.localeCompare(b.formation.code));

export const LIEUX = [...new Set(SESSIONS.map((x) => x.session.ville))];

/** Chiffres clés calculés depuis les données (jamais écrits en dur). */
export const CHIFFRES = {
  formations: FORMATIONS.length,
  lieux: LIEUX.filter((v) => v !== 'En ligne').length,
  familles: ORDRE.length,
};

/** Format d'affichage d'une session à partir des dates ISO (affichage seulement). */
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export function formatSession(s: { debut: string; fin: string; moisSeulement?: boolean }): string {
  const [ya, ma, da] = s.debut.split('-').map(Number);
  const [yb, mb, db] = s.fin.split('-').map(Number);
  if (s.moisSeulement) return `${MOIS[ma - 1][0].toUpperCase()}${MOIS[ma - 1].slice(1)} ${ya}`;
  const j = (d: number) => (d === 1 ? '1er' : String(d));
  if (ya === yb && ma === mb) return da === db ? `${j(da)} ${MOIS[ma - 1]} ${ya}` : `${j(da)}–${j(db)} ${MOIS[ma - 1]} ${ya}`;
  return `${j(da)} ${MOIS[ma - 1]} – ${j(db)} ${MOIS[mb - 1]} ${yb}`;
}

export const formatEuros = (n: number) => `${n.toLocaleString('fr-FR').replace(/ | /g, ' ')} €`;
