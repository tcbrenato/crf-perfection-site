/** Navigation principale : ≤ 6 entrées (brief). */
export const NAV = [
  { label: 'Qui sommes-nous', to: '/qui-sommes-nous' },
  {
    label: 'Nos activités', to: '/nos-activites',
    children: [
      { label: 'Les quatre rubriques', to: '/nos-activites' },
      { label: 'Diagnostic & conseil', to: '/nos-activites/diagnostic-conseil' },
      { label: 'Formations sur mesure', to: '/formations-sur-mesure' },
      { label: 'Recherche appliquée', to: '/nos-activites/recherche-appliquee' },
    ],
  },
  { label: 'Catalogue 2027', to: '/catalogue-2027' },
  { label: 'COPAF', to: '/copaf' },
  { label: 'Contact', to: '/contact' },
] as const;
