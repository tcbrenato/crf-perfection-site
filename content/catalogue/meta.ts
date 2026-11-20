/**
 * Données dérivées du Word, ajoutées pour le site (slug, sessions datées, tarifs chiffrés, profils de filtre).
 * Règle : aucune date, aucun lieu, aucun coût n'est modifié. Les dates ISO recopient exactement le champ « période »
 * du Word ; les montants recopient exactement le champ « coût ». Toute valeur absente reste absente.
 */
import type { FicheWord, Format, Profil, Session, Tarif } from './types';

interface Meta {
  slug: string;
  cible: string;
  profils: Profil[];
  formatType: Format;
  jours: number;
  sessions: Session[];
  tarifs: Tarif[];
}

const s = (debut: string, fin: string, ville: string, pays: string, moisSeulement = false): Session =>
  ({ debut, fin, ville, pays, ...(moisSeulement ? { moisSeulement } : {}) });

export const META: Record<string, Meta> = {
  T1: { slug: 't1-port-intelligent-strategie-gouvernance-ia', cible: 'Directeurs généraux & Board', profils: ['dg'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-04-12', '2027-04-13', 'Dubaï', 'Émirats arabes unis')],
    tarifs: [{ libelle: 'DG', montant: 5000 }, { libelle: 'Autres participants', montant: 4000 }] },
  T2: { slug: 't2-cyber-resilience-portuaire', cible: 'Directeurs Systèmes Informatiques & Numériques', profils: ['dsi'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-07-22', '2027-07-23', 'Casablanca', 'Maroc')],
    tarifs: [{ libelle: 'par participant', montant: 4000 }] },
  T3: { slug: 't3-marketing-portuaire-attractivite-ia', cible: 'Directeurs commerciaux et marketing', profils: ['commercial'], formatType: 'presentiel', jours: 3,
    sessions: [s('2027-05-04', '2027-05-06', 'Dakar', 'Sénégal')],
    tarifs: [{ libelle: 'par participant', montant: 4000 }] },
  T4: { slug: 't4-talents-metiers-portuaires-ia', cible: 'Directeurs des ressources humaines', profils: ['drh'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-09-20', '2027-09-21', 'Casablanca', 'Maroc')],
    tarifs: [{ libelle: 'par participant', montant: 4000 }] },
  T5: { slug: 't5-exploitation-port-digitalise', cible: 'Autres cadres', profils: ['exploitation'], formatType: 'presentiel', jours: 3,
    sessions: [s('2027-09-13', '2027-09-15', 'Tanger', 'Maroc')],
    tarifs: [{ libelle: 'par participant', montant: 4000 }] },

  W1: { slug: 'w1-routes-maritimes-strategie-hub', cible: 'Directeurs généraux et directeurs commerciaux', profils: ['dg', 'commercial'], formatType: 'en-ligne', jours: 1,
    sessions: [s('2027-03-25', '2027-03-25', 'En ligne', 'Webinaire')],
    tarifs: [{ libelle: 'par participant', montant: 2000 }] },
  W2: { slug: 'w2-decarbonation-conformite-omi', cible: "Directeurs généraux et cadres de l'exploitation", profils: ['dg', 'exploitation'], formatType: 'en-ligne', jours: 1,
    sessions: [s('2027-06-01', '2027-06-30', 'En ligne', 'Webinaire', true)],
    tarifs: [{ libelle: 'par participant', montant: 2000 }] },

  C1: { slug: 'c1-diagnostic-maturite-digitale', cible: 'Directions de pilotage', profils: ['dsi', 'dg'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-10-18', '2027-10-19', 'Dar es Salaam', 'Tanzanie')], tarifs: [] },
  C2: { slug: 'c2-business-case-roi-projet-technologique', cible: 'Directions de pilotage', profils: ['dg', 'dsi'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-10-20', '2027-10-21', 'Dar es Salaam', 'Tanzanie')], tarifs: [] },
  C3: { slug: 'c3-gouvernance-donnee-portuaire', cible: 'Directions de pilotage', profils: ['dsi', 'dg'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-10-18', '2027-10-19', 'Dar es Salaam', 'Tanzanie')], tarifs: [] },
  C4: { slug: 'c4-ia-escales-eta-moyens-nautiques', cible: 'Cadres techniques', profils: ['exploitation'], formatType: 'presentiel', jours: 3,
    sessions: [s('2027-09-27', '2027-09-29', 'Mombasa', 'Kenya')], tarifs: [] },
  C5: { slug: 'c5-surete-portuaire-ia', cible: 'Cadres techniques', profils: ['exploitation', 'dsi'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-09-30', '2027-10-01', 'Mombasa', 'Kenya')], tarifs: [] },
  C6: { slug: 'c6-cybersecurite-systemes-industriels-portuaires', cible: 'Cadres techniques', profils: ['dsi', 'exploitation'], formatType: 'presentiel', jours: 3,
    sessions: [s('2027-09-27', '2027-09-29', 'Mombasa', 'Kenya')], tarifs: [] },
  C7: { slug: 'c7-cyber-exercice-communautaire', cible: 'Communauté portuaire', profils: ['exploitation', 'dsi'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-12-06', '2027-12-07', 'Zanzibar', 'Tanzanie')], tarifs: [] },
  C8: { slug: 'c8-systeme-communautaire-guichet-unique', cible: 'Directions de pilotage', profils: ['dg', 'dsi', 'commercial'], formatType: 'presentiel', jours: 3,
    sessions: [s('2027-10-20', '2027-10-22', 'Dar es Salaam', 'Tanzanie')], tarifs: [] },
  C9: { slug: 'c9-cooperation-inter-ports-projets-conjoints', cible: 'Directeurs généraux', profils: ['dg'], formatType: 'presentiel', jours: 2,
    sessions: [s('2027-11-08', '2027-11-09', 'Dubaï', 'Émirats arabes unis')], tarifs: [] },

  B1: { slug: 'b1-mise-en-service-port-eaux-profondes', cible: 'Équipes du port bénéficiaire', profils: ['dg', 'exploitation', 'dsi'], formatType: 'in-house', jours: 3, sessions: [], tarifs: [] },
  B2: { slug: 'b2-concession-ppp-contrats-performance', cible: 'Équipes du port bénéficiaire', profils: ['dg', 'commercial'], formatType: 'in-house', jours: 2, sessions: [], tarifs: [] },
  B3: { slug: 'b3-moderniser-terminal-sans-rupture', cible: 'Équipes du port bénéficiaire', profils: ['exploitation', 'dsi'], formatType: 'in-house', jours: 3, sessions: [], tarifs: [] },
  B4: { slug: 'b4-ports-secs-zones-logistiques-intermodalite', cible: 'Équipes du port bénéficiaire', profils: ['dg', 'commercial', 'exploitation'], formatType: 'in-house', jours: 2, sessions: [], tarifs: [] },
  B5: { slug: 'b5-flux-camions-facturation-manifestes', cible: 'Équipes du port bénéficiaire', profils: ['exploitation', 'dsi', 'commercial'], formatType: 'in-house', jours: 2, sessions: [], tarifs: [] },
  B6: { slug: 'b6-port-vert-decarbonation-alimentation-quai', cible: 'Équipes du port bénéficiaire', profils: ['dg', 'exploitation'], formatType: 'in-house', jours: 2, sessions: [], tarifs: [] },
};

/**
 * W1 et W2 (anciens « Module A » et « Module B ») : dans le Word, ils sont décrits dans un seul tableau
 * (« Deux modules d'une journée webinaire »), pas sous forme de fiche. Textes recopiés tels quels.
 */
export const MODULES_WORD: FicheWord[] = [
  {
    code: 'W1',
    titreWord: 'Module A · Atelier de réflexion · Routes maritimes, risques géopolitiques et stratégie de hub',
    intitule: 'Routes maritimes, risques géopolitiques et stratégie de hub',
    objectif: null,
    duree: '1 jour',
    format: 'Atelier de réflexion, en ligne (webinaire)',
    public: 'Pour les directeurs généraux et les directeurs commerciaux.',
    prerequis: null,
    lieu: 'En ligne (webinaire)',
    periode: '25 mars 2027',
    cout: '2 000 € par participant',
    hebergement: null,
    note: 'Intègre le volet « leadership et modèles économiques de rupture » proposé dans le catalogue de travail.',
    contenu: [],
  },
  {
    code: 'W2',
    titreWord: 'Module B · Table ronde · Décarbonation et conformité OMI : se préparer',
    intitule: 'Décarbonation et conformité OMI : se préparer',
    objectif: null,
    duree: '1 jour',
    format: 'Table ronde, en ligne (webinaire)',
    public: "Pour les directeurs généraux et les cadres de l'exploitation.",
    prerequis: null,
    lieu: 'En ligne (webinaire)',
    periode: 'Juin 2027',
    cout: '2 000 € par participant',
    hebergement: null,
    note: 'Approfondi sur mesure par le programme B6 (Partie 3).',
    contenu: [],
  },
];
