# SITEMAP : audit de l'ancien site et proposition du nouveau site

## 1. Ancien site (9 captures + 3 captures de menus)

### Menu de l'ancien site
- **Accueil**
- **Nos Services ▾** : Formations Professionnelles · Conseil Stratégique · Organisation de Conférences · Études & Recherche
- **Domaines d'Expertise ▾** : Formation & Développement · Marketing Digital · Intelligence Artificielle (IA) · Management de Projets Numériques · Management des Ressources Humaines · Business Thérapie
- **À Propos ▾** : Notre Histoire, Vision & Équipe · Blog, Certifications & Partenaires
- **Contact** · **Recherche** (loupe)

### Pages capturées

| # | Ancienne URL | H1 | Sections principales | Formulaires / boutons |
|---|---|---|---|---|
| 1 | `/` | Forger les Leaders de demain | Hero (texte animé) · 4 chiffres « audités 2024 » · 8 onglets de domaines · accompagnement sur mesure · 3 domaines d'intervention (image « Strategic Partners Inc. ») · consultation gratuite · 6 témoignages nominatifs · 4 atouts · appel à l'action | Télécharger le catalogue · Démarrer un projet · En savoir plus · Demander un devis · Contactez-nous · Demander une consultation gratuite · Inscrire mon organisation · Parler à un expert |
| 2 | `/about/company-overview` | Qui Sommes-Nous ? | Histoire · mission · frise 2006–2024 · 4 chiffres · vision · 4 piliers · Vision 2030 · équipe (2 personnes) · 4 valeurs · appel à l'action | Notre Histoire / Vision / Équipe (ancres) · Contactez-Nous |
| 3 | `/about/resources` | Blog, Certifications & Partenaires | 3 blocs « Explorer » (blog, certifications, partenaires) sans contenu visible · 4 atouts · appel à l'action | Explorer ×3 · Lire le Blog · Nous Contacter |
| 4 | `/contact` | Parlons de Votre Projet | 4 chiffres · 4 canaux · **formulaire** (nom, email, téléphone, entreprise, service, message) · temps de réponse · horaires · accréditations · carte Google Maps · appel à l'action | Envoyer le message · Appelez-nous · WhatsApp |
| 5 | `/professional-training-services` | Formations Professionnelles | Éditorial du Dr Oloutayo William Odah · 4 pôles · hybridation · atouts · COPAF + Business Thérapie · public cible · appel à l'action | Demander un Devis · Télécharger le Catalogue · Commencer Ma Formation |
| 6 | `/strategic-consulting-services` | Conseils Stratégiques | 4 domaines · atouts · approche · appel à l'action | Diagnostic Gratuit · Démarrer Mon Projet Stratégique |
| 7 | `/conference-organization-services` | Organisation de Conférences | COPAF 2026 · offres · 4 piliers · accompagnement 360° · appel à l'action | Inscription COPAF 2026 · Devenir Sponsor |
| 8 | `/research-studies-services` | Études et Recherches | 4 services · atouts · méthodologie · études de cas · appel à l'action | Demander une Étude · Lancer Mon Étude |
| 9 | `/training-development-hub` | Formation & Développement | 4 modules · atouts · appel à l'action | Demander un Devis · Télécharger le Catalogue |

**Non capturées** : 5 sous-pages « Domaines d'Expertise » (Marketing Digital, IA, Management de Projets Numériques, Management des RH, Business Thérapie), Recherche, Politique de Confidentialité, Conditions d'Utilisation. Leurs URL sont inconnues.
**Liens externes** : Google Maps, WhatsApp, LinkedIn, Twitter, Facebook (URL inconnues). copaf-ports.com n'apparaît nulle part.
**Blog** : il figure dans le menu, mais aucun article n'est visible. **Pas de page Actualités**, sauf si des articles existent réellement (voir QUESTIONS).

## 2. Nouveau site proposé

### Menu (5 entrées + bouton)
`Qui sommes-nous` · `Nos activités ▾` · `Catalogue 2027` · `COPAF` · `Contact` · **[Parlons de votre projet]** · FR | EN
« Nos activités ▾ » ouvre : Diagnostic & conseil · Formations sur mesure · Recherche appliquée. Le logo ramène à l'accueil.

Les 4 « services » et les 6 « domaines d'expertise » de l'ancien site (deux menus qui se recoupent) sont regroupés en **4 rubriques** et un **catalogue** filtrable. Les domaines (IA, management de projets numériques, RH, marketing) deviennent des **filtres et des cibles du catalogue** (T1 à T5) au lieu de pages séparées.

### Arborescence

| Page | URL FR | URL EN | Origine du contenu |
|---|---|---|---|
| Accueil | `/` | `/en/` | Brief + Word ; aucun chiffre ni témoignage non sourcé |
| Qui sommes-nous | `/qui-sommes-nous` | `/en/about` | Ancienne page 2 (mission, valeurs, équipe à confirmer) + Word |
| Nos activités (4 rubriques) | `/nos-activites` | `/en/what-we-do` | Word |
| ↳ Diagnostic & conseil | `/nos-activites/diagnostic-conseil` | `/en/what-we-do/advisory` | Ancienne page 6 |
| ↳ Recherche appliquée | `/nos-activites/recherche-appliquee` | `/en/what-we-do/applied-research` | Ancienne page 8 |
| Formations sur mesure (B1–B6) | `/formations-sur-mesure` | `/en/in-house-training` | Word |
| **Catalogue 2027** | `/catalogue-2027` | `/en/catalogue-2027` | Word (22 formations) ; remplace les anciennes pages 5 et 9 et les 6 domaines |
| Fiches formation (×22) | `/formations/t2-cyber-resilience-portuaire`, etc. | `/en/courses/…` | Word |
| COPAF | `/copaf` | `/en/copaf` | Brief + ancienne page 7 |
| Inscription | `/inscription` | `/en/registration` | Brief |
| Contact / devis | `/contact` | `/en/contact` | Ancienne page 4 (canaux, horaires) + brief |
| Mentions légales | `/mentions-legales` | `/en/legal-notice` | Modèle « à compléter par CRF Perfection » |
| Confidentialité | `/confidentialite` | `/en/privacy` | À fournir (ancienne page non capturée) |
| Conditions d'inscription | `/conditions-inscription` | `/en/registration-terms` | À fournir |
| Admin (noindex) | `/admin` | – | Nouveau |
| 404 | `*` | `*` | Nouveau |

### Redirections 301 (détail final dans `docs/REDIRECTIONS.md`)
| Ancienne | Nouvelle |
|---|---|
| `/about/company-overview` | `/qui-sommes-nous` |
| `/about/resources` | `/qui-sommes-nous` |
| `/contact` | `/contact` (inchangée) |
| `/professional-training-services` | `/catalogue-2027` |
| `/training-development-hub` | `/catalogue-2027` |
| `/strategic-consulting-services` | `/nos-activites/diagnostic-conseil` |
| `/research-studies-services` | `/nos-activites/recherche-appliquee` |
| `/conference-organization-services` | `/copaf` |
| 5 sous-pages « Domaines d'Expertise » | `/catalogue-2027` (URL exactes à relever sur le site en ligne) |
| Politique de confidentialité, Conditions d'utilisation | `/confidentialite`, `/conditions-inscription` (URL à relever) |

### Ce qui ne sera pas repris sans preuve écrite
- **Chiffres** : 850+ / 1000+ / 5000+ / 500+ formés, 45+ programmes, 12 M€, 15 ans / 18+ ans / 5+ ans, 98 % / 95 %, 200+ entreprises, 150+ missions, 50+ experts, 20+ / 25+ pays, temps de réponse « garantis » 2 h / 24 h / 48 h, support 24/7.
- **Certifications** : ISO 9001, QUALIOPI, « Méthodologie Certifiée ISO ».
- **Témoignages** : les 6 témoignages nominatifs de l'accueil.
- **Visuels tiers** : l'image « Strategic Partners Inc. » et les photos de banque d'images de la page Ressources.
- **Offres gratuites** : « Diagnostic Gratuit » et « Consultation Gratuite », sauf confirmation.
