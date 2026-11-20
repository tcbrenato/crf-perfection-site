import type { ReactElement } from 'react';
import { Home } from '@/pages/Home';
import { Placeholder } from '@/pages/Placeholder';
import { FORMATIONS } from '@content/catalogue';

export interface RouteDef { path: string; element: ReactElement; prerender?: boolean }

const p = (path: string, title: string, etape: 2 | 3): RouteDef =>
  ({ path, element: <Placeholder path={path} title={title} etape={etape} /> });

export const ROUTES: RouteDef[] = [
  { path: '/', element: <Home /> },
  p('/qui-sommes-nous', 'Qui sommes-nous', 3),
  p('/nos-activites', 'Nos activités', 3),
  p('/nos-activites/diagnostic-conseil', 'Diagnostic & conseil', 3),
  p('/nos-activites/recherche-appliquee', 'Recherche appliquée', 3),
  p('/formations-sur-mesure', 'Formations sur mesure', 3),
  p('/catalogue-2027', 'Catalogue de formation 2027', 2),
  p('/copaf', 'COPAF', 2),
  p('/inscription', 'Inscription', 2),
  p('/contact', 'Contact', 2),
  p('/mentions-legales', 'Mentions légales', 3),
  p('/confidentialite', 'Politique de confidentialité', 3),
  ...FORMATIONS.map((f) => p(`/formations/${f.slug}`, `${f.reference} · ${f.intitule}`, 2)),
];
