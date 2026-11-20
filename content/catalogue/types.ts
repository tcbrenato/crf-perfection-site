/** Types du catalogue 2027. Les champs texte viennent du Word sans reformulation. */

export type Famille = 'T' | 'W' | 'C' | 'B';

export type Profil = 'dg' | 'dsi' | 'commercial' | 'drh' | 'exploitation';

export type Format = 'presentiel' | 'en-ligne' | 'in-house';

export interface Session {
  /** Date ISO de début (AAAA-MM-JJ) ; pour un mois sans jour précis, le 1er du mois. */
  debut: string;
  /** Date ISO de fin (incluse). */
  fin: string;
  /** Vrai quand le Word ne donne que le mois (ex. « juin 2027 »). */
  moisSeulement?: boolean;
  ville: string;
  pays: string;
}

export interface Tarif {
  /** Libellé affiché (ex. « DG », « par participant »). */
  libelle: string;
  /** Montant en euros. */
  montant: number;
}

/** Champs bruts extraits du Word (voir scripts/extract-catalogue.py). */
export interface FicheWord {
  code: string;
  titreWord: string;
  intitule: string;
  filAriane?: string;
  objectif: string | null;
  duree: string | null;
  format: string | null;
  public: string | null;
  prerequis: string | null;
  lieu: string | null;
  periode: string | null;
  cout: string | null;
  hebergement: string | null;
  problematique?: string;
  competences?: string;
  livrable?: string;
  prolonge?: string;
  portsConcernes?: string;
  differenceT2?: string;
  /** Précision libre du Word (W1, W2). */
  note?: string;
  contenu: string[];
}

export interface Formation extends FicheWord {
  famille: Famille;
  /** Référence complète, ex. CRF-27-T2 */
  reference: string;
  slug: string;
  /** Cible affichée sur la carte (libellé court). */
  cible: string;
  profils: Profil[];
  formatType: Format;
  /** Durée en jours (pour le filtre). */
  jours: number;
  sessions: Session[];
  tarifs: Tarif[];
  /** Vrai pour B1–B6 : sur devis, pas d'inscription directe. */
  surDevis: boolean;
}
