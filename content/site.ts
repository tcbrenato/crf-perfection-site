/**
 * Informations institutionnelles. Sources : catalogue 2027 (Word + PDF), ancien site (captures).
 * Rien n'est inventé ; ce qui manque est marqué À_FOURNIR et listé dans docs/QUESTIONS.md.
 */

export const A_FOURNIR = '[À FOURNIR]';

export const SITE = {
  nom: 'CRF Perfection',
  nomLong: 'CRF Perfection, Centre de Recherche et de Formation',
  sousTitre: 'Centre de Recherche et de Formation',
  slogan: 'Former. Conseiller. Faire rayonner.',
  domaine: 'crfperfection.pro',
  url: 'https://crfperfection.pro',
  metiers: 'Formation · Conseil stratégique · Recherche appliquée',
  themes: ['IA', 'Cybersécurité', 'Gouvernance', 'Smart Ports', 'Décarbonation'],
  contact: {
    email: 'contact@crfperfection.pro',
    telephones: [
      { libelle: 'Bénin', affiche: '+229 01 69 30 30 19', tel: '+2290169303019' },
      { libelle: 'États-Unis', affiche: '+1 (240) 978-4155', tel: '+12409784155' },
    ],
    emailCopaf: 'contact@copaf-ports.com',
    /** Adresse postale : deux adresses contradictoires sur l'ancien site (voir QUESTIONS). */
    adresse: null as string | null,
  },
  /** Catalogue 2027 (Word et PDF) ; l'ancien site citait Bénin, Côte d'Ivoire, Togo (voir QUESTIONS). */
  implantation: {
    siege: 'États-Unis',
    agences: ['Bénin', "Côte d'Ivoire", 'Maroc', 'Togo'],
  },
  /** URL des réseaux sociaux : non fournies (icônes visibles sur l'ancien site, liens inconnus). */
  reseaux: [] as { nom: string; url: string }[],
  copafUrl: 'https://copaf-ports.com',
};

/** « CRF Perfection en bref » (Word, Présentation). */
export const EN_BREF = [
  { titre: 'Qui nous sommes', texte: "Cabinet international de formation, de conseil stratégique et de recherche appliquée, basé aux États-Unis, avec des agences en Afrique (Bénin, Côte d'Ivoire, Maroc, Togo)." },
  { titre: 'Notre expérience', texte: 'Plus de dix ans de formation à grande échelle et de perfectionnement des cadres, dont une première Conférence des Ports Africains (COPAF 2026) tenue à Casablanca sur le Smart Port Africain.' },
  { titre: 'Notre promesse', texte: "Un partenaire stratégique des autorités portuaires africaines : des programmes précis et exigeants sur l'IA, la cybersécurité, le management portuaire et la digitalisation des processus de gestion portuaire." },
];

/** Les quatre rubriques du plan d'action 2027 (Word, Partie 1). */
export const RUBRIQUES = [
  {
    num: 1, cle: 'conference', titre: 'Conférence internationale et immersion technique', court: 'Conférence internationale',
    resume: 'COPAF 2027 en partenariat avec la PMAESA : panels exécutifs et immersion technique.',
    intitule: 'Organisation de la 2ᵉ édition de la Conférence des Ports Africains (COPAF 2027), en partenariat avec la PMAESA (Port Management Association of Eastern and Southern Africa).',
    description: "Dans la continuité du succès de la COPAF 2026 à Casablanca, CRF Perfection consolide son rôle de catalyseur du dialogue portuaire interrégional. En s'associant à la PMAESA, l'édition 2027 crée un pont entre les autorités portuaires d'Afrique de l'Ouest, du Centre, de l'Est et australe. Elle combine panels exécutifs de haut niveau et ateliers d'immersion technique : gouvernance des Smart Ports, cybersécurité des infrastructures critiques, IA et facilitation du commerce transfrontalier.",
    objectif: "Positionner CRF Perfection comme le leader africain de la réflexion stratégique et du réseautage exécutif portuaire, en élargissant son empreinte vers l'Afrique orientale et australe.",
    lien: '/copaf',
  },
  {
    num: 2, cle: 'diagnostic', titre: 'Missions de diagnostic et conseil stratégique', court: 'Diagnostic et conseil stratégique',
    resume: 'Audits de maturité digitale et diagnostics des écosystèmes portuaires.',
    intitule: 'Accompagnement sur-mesure, audits de maturité digitale et diagnostics organisationnels des écosystèmes portuaires.',
    description: "CRF Perfection déploie en 2027 un pôle d'ingénierie et de conseil dédié aux missions de diagnostic sur site : évaluation de la maturité digitale, audit de cyber-résilience, optimisation des processus logistiques et gouvernance des données. Chaque mission débouche sur une feuille de route opérationnelle et un plan de transformation adaptés au port partenaire.",
    objectif: "Être un cabinet de conseil stratégique de référence, capable d'identifier les vulnérabilités opérationnelles et de recommander des solutions à fort retour sur investissement.",
    lien: '/nos-activites/diagnostic-conseil',
  },
  {
    num: 3, cle: 'in-house', titre: 'Formation personnalisée et sur-mesure (in-house)', court: 'Formation sur-mesure (in-house)',
    resume: 'Programmes fermés, bâtis sur le diagnostic et la gestion des projets de chaque Port.',
    intitule: 'Programme de renforcement des capacités sur-mesure et accompagnement des transformations internes des ports.',
    description: "CRF Perfection conçoit et exécute des programmes fermés, directement au sein des autorités portuaires ou sur des sites d'immersion dédiés. Les parcours sont modelés sur le diagnostic préalable des besoins et s'adressent à des équipes constituées : comités de direction, équipes informatique et cybersécurité, directions opérationnelles.",
    objectif: "Offrir une flexibilité maximale aux dirigeants portuaires, garantir un impact direct sur la performance des équipes et sécuriser des contrats d'accompagnement pluriannuels.",
    lien: '/formations-sur-mesure',
  },
  {
    num: 4, cle: 'catalogue', titre: 'Catalogue « à la carte » et inter-entreprises', court: 'Catalogue à la carte (inter-entreprises)',
    resume: 'Modules de pointe en IA, cybersécurité, management portuaire par profil décisionnel et digitalisation des processus opérationnels portuaires.',
    intitule: 'Déploiement du Catalogue exécutif 2027 : modules de pointe en IA, cybersécurité et management portuaire.',
    description: "Fort de plus de dix ans d'expérience dans la formation à grande échelle et le perfectionnement des cadres, CRF Perfection publie son catalogue spécialisé 2027, structuré par profil décisionnel : directeurs généraux, directeurs commerciaux et marketing, directeurs des ressources humaines, autres cadres. L'IA appliquée aux terminaux, la gestion des risques cyber et le leadership de la transformation y sont transversaux.",
    objectif: "Assurer un flux régulier d'activités académiques et techniques, maintenir une offre continue de montée en compétences pour l'écosystème portuaire africain et répondre aux besoins individuels de perfectionnement des cadres.",
    lien: '/catalogue-2027',
  },
] as const;

/** Éditorial du Directeur Général (PDF du catalogue 2027, page 2). */
export const EDITORIAL = {
  surtitre: 'Éditorial · Mot du Directeur Général',
  titre: ['La compétence est l’infrastructure la plus ', 'précieuse', ' d’un port'] as const,
  salutation: 'Chers partenaires, chers dirigeants portuaires,',
  paragraphes: [
    'Les ports africains évoluent dans un environnement exigeant. L’instabilité des routes maritimes, l’impératif de décarbonation porté par le cadre de l’OMI, la montée des cybermenaces sur les chaînes logistiques et l’essor de l’intelligence artificielle dans la planification des escales, la maintenance comme dans la relation client, redessinent nos métiers. Dans le même temps, le déploiement de la ZLECAf et l’ouverture de nouvelles infrastructures accentuent la concurrence entre plateformes.',
    'Face à ces mutations, les investissements matériels et technologiques ne suffisent pas. Un terminal automatisé, un Port Community System ou un centre de supervision ne créent de la valeur durable que si les équipes savent les piloter, les sécuriser et les faire évoluer. La compétence est l’infrastructure la plus précieuse d’un port.',
    'C’est cette conviction qui guide CRF Perfection. Depuis plus de dix ans, nous accompagnons la montée en puissance des cadres et des organisations. La première Conférence des Ports Africains (COPAF 2026), tenue à Casablanca autour du Smart African Port, a confirmé l’urgence de solutions opérationnelles, pensées pour les réalités de nos ports. Ce catalogue 2027 y apporte une réponse structurée.',
    'Il s’articule autour de cinq parcours adaptés à cinq niveaux de responsabilité — des directions générales aux équipes d’exploitation —, complétés par deux modules transversaux et quinze programmes spécialisés. Neuf d’entre eux prolongent directement les travaux de la COPAF, tandis que six ciblent des chantiers structurants : mise en service, concessions, modernisation, ports secs, fluidité numérique et port vert. Chaque formation s’appuie sur vos données, vos contrats et vos priorités opérationnelles, avec un objectif clair : produire un livrable directement actionnable dès le retour sur site.',
    'J’invite les directions générales à traiter le développement des compétences comme un investissement stratégique à part entière, au même titre que les infrastructures physiques. Former en amont coûte toujours moins cher que corriger a posteriori ; surtout, des équipes préparées renforcent la sûreté, la performance, l’attractivité et la crédibilité du port auprès de ses clients.',
    'Nos équipes restent à votre disposition pour conduire un diagnostic préalable et concevoir avec vous les dispositifs les plus pertinents. Nous aurons également le plaisir de prolonger ces échanges lors de la session des managers à Dubaï en 2027.',
  ],
  signature: 'Dr William Odah',
  fonction: 'Directeur Général, CRF Perfection',
};
