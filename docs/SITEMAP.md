# SITEMAP : audit de l'ancien site et proposition du nouveau site

## 1. Ancien site (d'après les 5 captures reçues)

| # | Ancienne URL | Titre H1 | Sections | Formulaires / boutons | Liens externes |
|---|---|---|---|---|---|
| 1 | `/professional-training-services` | Formations Professionnelles | Hero + éditorial Dr Oloutayo William Odah + 4 chiffres · 4 pôles · Hybridation des compétences · Pourquoi nous (4) · COPAF + Business Thérapie · Public cible (4) · Appel à l'action (3 cartes) · bloc coordonnées | Demander un Devis · Télécharger le Catalogue · Prendre rendez-vous · Demander un devis · Commencer Ma Formation | – |
| 2 | `/strategic-consulting-services` | Conseils Stratégiques | Hero + 4 chiffres · 4 domaines d'intervention · Pourquoi nous (4) · Notre Approche + Ce Que Nous Offrons · Appel à l'action (3 cartes) | Diagnostic Gratuit · Nos Services · Demander un diagnostic · Voir les études de cas · Demander une proposition · Démarrer Mon Projet Stratégique | – |
| 3 | `/conference-organization-services` | Organisation de Conférences | Hero COPAF 2026 + 4 chiffres · 4 offres événementielles · 4 piliers · Accompagnement 360° + Garantie d'Excellence · Appel à l'action (3 cartes) | Inscription COPAF 2026 · Devenir Sponsor · S'inscrire maintenant · Devenir sponsor · Prendre contact · Participer à la COPAF 2026 | (copaf-ports.com absent des captures) |
| 4 | `/research-studies-services` | Études et Recherches | Hero + 4 chiffres · 4 services de recherche · Pourquoi nous (4) · Méthodologie (2 étapes visibles sur 4) + Études à impact · Appel à l'action (3 cartes) | Demander une Étude · Découvrir nos Services · Prendre rendez-vous · Voir nos études · Demander un devis · Lancer Mon Étude | – |
| 5 | `/training-development-hub` | Formation & Développement | Hero + éditorial court + 4 chiffres · 4 modules · Pourquoi nous (4) · Appel à l'action bordeaux | Demander un Devis · Explorer les Programmes · Télécharger le Catalogue | – |

**Menu** : Accueil · Nos Services ▾ · Domaines d'Expertise ▾ · À Propos ▾ · Contact · Recherche.
**Pied de page** : présentation · contact · 4 services · LinkedIn / Twitter / Facebook · Politique de Confidentialité · Conditions d'Utilisation · bouton flottant vert.
**Pages citées mais non capturées** : Accueil, sous-pages « Domaines d'Expertise » et « À Propos », Contact, Recherche, Politique de Confidentialité, Conditions d'Utilisation (URL inconnues).
**Actualités / Publications** : aucune trace dans le menu ni dans le pied de page. **Pas de page Actualités** sauf indication contraire.
**Observation** : les pages 1 et 5 se recoupent (deux pages « formation » avec des chiffres différents) ; elles fusionnent dans le Catalogue 2027.

## 2. Nouveau site proposé

### Menu (5 entrées + bouton)
`Qui sommes-nous` · `Nos activités ▾` · `Catalogue 2027` · `COPAF` · `Contact` · **[Parlons de votre projet]** · sélecteur FR | EN
(le logo ramène à l'accueil ; le menu « Nos activités » ouvre : Diagnostic & conseil · Formations sur mesure · Recherche appliquée)

### Arborescence

| Page | URL FR | URL EN | Origine du contenu |
|---|---|---|---|
| Accueil | `/` | `/en/` | Brief + chiffres absents (aucun chiffre non sourcé) |
| Qui sommes-nous | `/qui-sommes-nous` | `/en/about` | Pied de page + Word ; capture « À Propos » attendue |
| Nos activités (4 rubriques) | `/nos-activites` | `/en/what-we-do` | Word (4 rubriques) |
| Diagnostic & conseil | `/nos-activites/diagnostic-conseil` | `/en/what-we-do/advisory` | Ancienne page 2 |
| Recherche appliquée | `/nos-activites/recherche-appliquee` | `/en/what-we-do/applied-research` | Ancienne page 4 |
| Formations sur mesure (in-house) | `/formations-sur-mesure` | `/en/in-house-training` | Word (B1–B6, démarche en 5 étapes, projets publics) |
| **Catalogue 2027** | `/catalogue-2027` | `/en/catalogue-2027` | Word (22 formations) + anciennes pages 1 et 5 |
| Fiche formation (×22) | `/formations/t2-cyber-resilience-portuaire`, etc. | `/en/courses/…` (TODO-EN) | Word |
| COPAF | `/copaf` | `/en/copaf` | Brief + ancienne page 3 (chiffres non confirmés retirés) |
| Inscription | `/inscription` | `/en/registration` | Brief |
| Contact / devis | `/contact` | `/en/contact` | Brief + pied de page |
| Mentions légales | `/mentions-legales` | `/en/legal-notice` | À fournir (modèle marqué) |
| Confidentialité | `/confidentialite` | `/en/privacy` | Ancienne page « Politique de Confidentialité » (à capturer) |
| Conditions d'inscription | `/conditions-inscription` | `/en/registration-terms` | **À fournir** (requis par le formulaire) |
| Admin (noindex, Supabase Auth) | `/admin` | – | Nouveau |
| 404 | `*` | `*` | Nouveau |

Pied de page : logo blanc, « Former. Conseiller. Faire rayonner. », coordonnées, plan du site, réseaux sociaux (URL à fournir), liens légaux.

### Redirections 301 prévues (détail dans `docs/REDIRECTIONS.md` à l'étape 4)
| Ancienne | Nouvelle |
|---|---|
| `/professional-training-services` | `/catalogue-2027` |
| `/training-development-hub` | `/catalogue-2027` |
| `/strategic-consulting-services` | `/nos-activites/diagnostic-conseil` |
| `/research-studies-services` | `/nos-activites/recherche-appliquee` |
| `/conference-organization-services` | `/copaf` |
| autres anciennes URL | à compléter quand les captures manquantes arriveront |

### Ce qui disparaît de l'ancien site (proposition)
- Tous les chiffres non sourcés (500+, 1000+, 95 %, 98 %, 200+, +150 % ROI, 25+ pays, 15K+, « ISO Qualité Certifiée », études de cas chiffrées) : règle « rien d'inventé ». Ils reviennent seulement si CRF Perfection en fournit la preuve.
- « Diagnostic Gratuit », « Consultation Gratuite » : engagement commercial à confirmer.
- Programme « Business Thérapie », pôles RH / marketing génériques : absents du catalogue 2027. À garder ou non (voir QUESTIONS).
- Fonction « Recherche » de l'en-tête : remplacée par la recherche du catalogue (code ou mot-clé).
