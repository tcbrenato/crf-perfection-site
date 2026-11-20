import type { ReactElement } from 'react';
import { Home } from '@/pages/Home';
import { Catalogue } from '@/pages/Catalogue';
import { FormationPage } from '@/pages/Formation';
import { Inscription } from '@/pages/Inscription';
import { Contact } from '@/pages/Contact';
import { Admin } from '@/pages/Admin';
import { About, Activites, Diagnostic, Recherche, SurMesure, Copaf, Legal } from '@/pages/Content';
import { FORMATIONS } from '@content/catalogue';

export interface RouteDef { path: string; element: ReactElement }

export const ROUTES: RouteDef[] = [
  { path: '/', element: <Home /> },
  { path: '/qui-sommes-nous', element: <About /> },
  { path: '/nos-activites', element: <Activites /> },
  { path: '/nos-activites/diagnostic-conseil', element: <Diagnostic /> },
  { path: '/nos-activites/recherche-appliquee', element: <Recherche /> },
  { path: '/formations-sur-mesure', element: <SurMesure /> },
  { path: '/catalogue-2027', element: <Catalogue /> },
  { path: '/copaf', element: <Copaf /> },
  { path: '/inscription', element: <Inscription /> },
  { path: '/contact', element: <Contact /> },
  { path: '/mentions-legales', element: <Legal kind="mentions" /> },
  { path: '/confidentialite', element: <Legal kind="confidentialite" /> },
  { path: '/conditions-inscription', element: <Legal kind="conditions" /> },
  { path: '/admin', element: <Admin /> },
  ...FORMATIONS.map((f) => ({ path: `/formations/${f.slug}`, element: <FormationPage slug={f.slug} /> })),
];
