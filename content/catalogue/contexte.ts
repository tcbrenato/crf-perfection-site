/** Contexte du catalogue (Word, Partie 2 et Partie 3). Textes recopiés ; renvois convertis en codes. */

export interface Enjeu {
  titre: string;
  texte: string;
  /** Renvois tels que donnés par le Word (« 1, 3, Module A »), convertis en codes. Voir QUESTIONS : renvois à vérifier. */
  codes: string[];
}

export const ENJEUX_2027: Enjeu[] = [
  { titre: 'Routes maritimes instables', codes: ['T1', 'T3', 'W1'],
    texte: "Août 2026 : environ 1,68 million d'EVP par Suez, soit +184 % sur un an mais −74 % par rapport à août 2023. Retour réversible depuis le conflit avec l'Iran (28 février 2026). Impact : repositionner le port." },
  { titre: 'Décarbonation', codes: ['T1', 'W2'],
    texte: "Le cadre net-zéro de l'OMI n'est pas adopté ; une réunion d'adoption est prévue en décembre 2026. Impact : anticiper les investissements." },
  { titre: 'Cybercriminalité', codes: ['T2', 'T4'],
    texte: 'À la COPAF 2026, le DG de la NPA (Nigeria) a présenté les cyber-incidents comme des interruptions du commerce. Précédent : Transnet, force majeure en juillet 2021. Impact : un arrêt de terminal engage la direction générale.' },
  { titre: 'Intelligence artificielle', codes: ['T1', 'T3', 'T5'],
    texte: 'Prévision du trafic, planification des escales, maintenance prédictive : un sujet de direction générale. Impact : des cas d\'usage mesurés.' },
  { titre: 'Commerce intra-africain', codes: ['T3', 'T4'],
    texte: 'Afreximbank prévoit +10 % en 2026, à 230 milliards USD, dans un scénario optimiste. Impact : une offre digitale et une relation client structurées.' },
  { titre: 'Nouvelles capacités', codes: ['T1', 'W1'],
    texte: 'Nador West Med annoncé pour fin 2026, Dakhla Atlantique pour 2028. Impact : clarifier son positionnement.' },
];

export const PROJETS_PUBLICS = [
  { projet: 'Port en eaux profondes de Lekki (1,5 Md$)', pays: 'Nigéria', codes: ['B1', 'B2'] },
  { projet: 'Apapa et Tin Can Island ; APM Terminals Apapa (600 M$)', pays: 'Nigéria', codes: ['B2', 'B3', 'B5'] },
  { projet: 'Projet portuaire de Tema (1,5 Md$)', pays: 'Ghana', codes: ['B1', 'B3'] },
  { projet: 'Ndayane (1,2 Md$) et plan de repositionnement de Dakar 2025-2029', pays: 'Sénégal', codes: ['B1', 'B2', 'B4', 'B5'] },
  { projet: 'Extension du port de San Pedro (2 Md$)', pays: "Côte d'Ivoire", codes: ['B1', 'B4'] },
  { projet: 'Simandou-Morebaya (20 Md$)', pays: 'Guinée', codes: ['B1', 'B2'] },
  { projet: 'Nador West Med (ouverture annoncée fin 2026)', pays: 'Maroc', codes: ['B1', 'B6'] },
];

/** « Comment nous construisons un programme pour un port » (5 étapes). */
export const DEMARCHE = [
  { titre: 'Cadrage', texte: 'Entretien avec la direction : projet, calendrier, équipes concernées.' },
  { titre: 'Diagnostic', texte: 'Mission de la Rubrique 2 : maturité, risques, besoins de compétences.' },
  { titre: 'Co-conception', texte: 'Choix des programmes C et B, adaptés aux données et aux contrats du port.' },
  { titre: 'Déploiement', texte: 'Sessions sur site ou en immersion, avec exercices sur cas réels.' },
  { titre: 'Mesure', texte: 'Attestation, livrables remis et suivi des indicateurs convenus.' },
];

/** Partie 3 : différence avec le catalogue et mode de livraison. */
export const PARTIE3 = {
  difference: 'Le catalogue répond aux profils décisionnels. Ces programmes répondent à un sujet précis, souvent avec des équipes mixtes et des données du port.',
  livraison: "En inter-entreprises pour la série COPAF, en in-house pour les séries par projet. Chaque port part d'un diagnostic préalable (Rubrique 2). Lieux, périodes et coûts : voir chaque fiche et le calendrier prévisionnel.",
};

/** « Pourquoi ce choix » des calendriers prévisionnels (Word), par lieu et période. */
export const CALENDRIER_RAISONS = [
  { periode: '25 mars', lieu: 'En ligne', sessions: 'W1 (webinaire)', raison: "Après l'Aïd al-Fitr (9–10 mars) : lance les inscriptions de Dubaï." },
  { periode: '12–13 avril', lieu: 'Dubaï (Émirats arabes unis)', sessions: 'T1 · Directeurs généraux & Board', raison: "Après Ramadan et Pâques ; avant le congrès de Dakar (27–29 avril) et l'Aïd al-Adha (15–18 mai)." },
  { periode: '4–6 mai', lieu: 'Dakar (Sénégal)', sessions: 'T3 · Directeurs commerciaux et marketing', raison: 'Juste après le congrès ports et logistique (27–29 avril) ; avant la Tabaski ; saison sèche.' },
  { periode: 'Juin & juillet', lieu: 'En ligne & Maroc (Casablanca) pour T2', sessions: 'W2 (webinaire) ; T2 (22–23 juillet) · DSI', raison: 'Clôture budgétaire en Afrique de l\'Est et CAN 2027 (19 juin–17 juillet) : format en ligne pour le webinaire et déroulement de T2 juste après la CAN.' },
  { periode: '13–21 sept.', lieu: 'Maroc (Tanger, puis Casablanca)', sessions: 'T5, Tanger (13–15) ; T4 (20–21) · DRH', raison: "Rentrée, hors vacances d'août ; Tanger Med comme terrain de visite." },
  { periode: '27 sept.–1er oct.', lieu: 'Kenya (Mombasa)', sessions: 'C4, C6 (27–29), C5 (30 sept.–1er oct.) · Cadres techniques', raison: 'Saison sèche, après la CAN 2027 ; siège du secrétariat de la PMAESA.' },
  { periode: '18–22 oct.', lieu: 'Dar es Salaam (Tanzanie)', sessions: 'C1, C3 (18–19), C2, C8 (20–22) · Directions de pilotage', raison: 'Avant les pluies courtes ; à aligner sur le forum PMAESA 2027 (dates non publiées).' },
  { periode: '8–9 nov.', lieu: 'Dubaï (Émirats arabes unis)', sessions: 'C9 · Directeurs généraux', raison: 'Climat favorable ; second rendez-vous des DG de l\'année.' },
  { periode: '6–7 déc.', lieu: 'Zanzibar (Tanzanie)', sessions: 'C7 · Communauté portuaire (résidentiel)', raison: 'Saison sèche ; avant la haute saison touristique et la clôture budgétaire.' },
];
