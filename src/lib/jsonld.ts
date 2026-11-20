import { SITE } from '@content/site';
import type { Formation } from '@content/catalogue';

export const organisationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.nom,
  alternateName: SITE.nomLong,
  url: SITE.url,
  logo: `${SITE.url}/logos/crf-perfection-couleur.png`,
  slogan: SITE.slogan,
  email: SITE.contact.email,
  telephone: SITE.contact.telephones.map((t) => t.tel),
  areaServed: 'Africa',
  ...(SITE.reseaux.length ? { sameAs: SITE.reseaux.map((r) => r.url) } : {}),
});

export const courseJsonLd = (f: Formation) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: f.intitule,
  courseCode: f.reference,
  description: f.objectif ?? f.intitule,
  url: `${SITE.url}/formations/${f.slug}`,
  provider: { '@type': 'Organization', name: SITE.nom, sameAs: SITE.url },
  inLanguage: 'fr',
  ...(f.sessions.length ? {
    hasCourseInstance: f.sessions.map((s) => ({
      '@type': 'CourseInstance',
      courseMode: f.formatType === 'en-ligne' ? 'online' : 'onsite',
      startDate: s.debut,
      endDate: s.fin,
      location: f.formatType === 'en-ligne' ? undefined : { '@type': 'Place', name: s.ville, address: s.pays },
    })),
  } : {}),
  ...(f.tarifs.length ? { offers: f.tarifs.map((t) => ({ '@type': 'Offer', category: t.libelle, price: t.montant, priceCurrency: 'EUR' })) } : {}),
});
