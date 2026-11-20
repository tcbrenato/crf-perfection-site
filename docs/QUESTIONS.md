# QUESTIONS : éléments manquants, contradictoires ou périmés

Statut : étape 0. Les questions bloquantes sont marquées **[BLOQUANT]**.

## A. Fichiers et environnement
1. **[BLOQUANT] Dépôt** : le seul dépôt de cette session est `tcbrenato/portfolio`, le portfolio personnel de Rénato TCHOBO, qui se déploie sur Hostinger (`/public_html/`) à chaque push sur `main`. Le site CRF ne doit pas l'écraser. Merci de créer un dépôt dédié (ex. `crf-perfection-site`) et de me le donner, ou de confirmer explicitement l'usage de ce dépôt-ci.
2. **[BLOQUANT] Catalogue Word** `CRF_Perfection_Catalogue_Formation_2027_Finalisé.docx` : non reçu. C'est la source unique des 22 formations.
3. **[BLOQUANT] Banque `/images/`** : non reçue. Les 4 images reçues sont les logos.
4. **PDF du catalogue 2027** (bouton « Télécharger le PDF ») : non reçu.
5. **Les 2 affiches de référence de la charte** : non reçues (facultatif, mais utile pour les lignes diagonales et les bandeaux).
6. **Captures manquantes** : Accueil, sous-pages « Domaines d'Expertise » et « À Propos », Contact, Recherche, Politique de Confidentialité, Conditions d'Utilisation, et le contenu des 3 menus déroulants.
7. **Logos** : reçus en image matricielle sans transparence (fond blanc, ou fond bleu `#182A40` pour la version blanche, légèrement différent de `#1B2A41`), à 560–600 px de large au maximum. Il faut des versions **SVG** (ou PNG transparent ≥ 2 000 px) : logo complet couleur, logo complet blanc, symbole seul (favicon). Sans elles, le logo sera flou sur écran Retina et formera un rectangle visible sur les fonds en dégradé. Je ne le redessinerai pas.

## B. Coordonnées (contradictions)
8. **Téléphone** : ancien site `+1 (240) 978-4155` (aussi WhatsApp) ; brief `+229 01 69 30 30 19`. On affiche les deux ? Seulement le béninois ? Le WhatsApp reste-t-il américain ?
9. **Adresse** : deux adresses américaines différentes sur l'ancien site : « 1901 Pennsylvania Avenue NW, Washington D.C. 20006 » (page Formations) et « 10411 Greenbelt road Uperoom, MD, 20706 » (pied de page ; « Uperoom » est sans doute une coquille de « Upper Room » ou d'un numéro de suite). Laquelle est valable ? Y a-t-il des adresses pour les agences africaines ?
10. **Pays des agences** : ancien site « Bénin, Côte d'Ivoire, Togo » ; Word (d'après le brief) « Bénin, Côte d'Ivoire, Maroc, Togo ». Le Maroc est-il une agence ?
11. **Réseaux sociaux** : URL LinkedIn, Twitter/X, Facebook à fournir. Le bouton flottant vert (WhatsApp ?) est-il à conserver ?

## C. Chiffres et affirmations de l'ancien site (non repris sans preuve)
12. Chiffres incohérents entre pages et non sourcés : 500+ / 1000+ professionnels formés ; 95 % / 98 % de satisfaction ; 200+ entreprises ; +150 % ROI moyen ; 100+ projets ; 500+ études ; 15K+ répondants ; 95 % de précision prédictive. Lesquels sont prouvables ?
13. « ISO, Qualité Certifiée » et « Méthodologie Certifiée ISO » : quelle norme, quel numéro de certificat ? Sinon, retirés.
14. « Certifications Reconnues » et « Chef de projet IA (certification) » : quel organisme certifie ?
15. Études de cas chiffrées (« Groupe Industriel Africain 95 % », « Organisation Internationale 85 % d'insertion », « Entreprise Technologique 88 % ») : peut-on les citer ? Sinon, retirées.
16. COPAF 2026 sur l'ancien site : « 500+ participants, 25+ pays africains, 50+ conférenciers ». Cela contredit « 5 autorités portuaires, 4 pays » du brief. Je retiens la formule du brief, sauf avis contraire.
17. Le « Diagnostic Gratuit » et la « Consultation Gratuite » restent-ils une offre réelle ?
18. « Plus de dix ans de formation à grande échelle » (brief) : je le reprends tel quel ; une date de création est-elle disponible ?

## D. Contenu à décider
19. **Éditorial du Dr Oloutayo William Odah** (2026) : à mettre à jour pour 2027, ou à retirer ? Quelle fonction lui attribuer (DG ?). Photo autorisée (fournie dans `/images/`) ?
20. **Programme « Business Thérapie »** et pôles génériques (RH, marketing, soft skills) : à conserver sur le nouveau site, alors qu'il cible les ports africains ?
21. **Méthodologie de recherche** : « 4 étapes » annoncées, seules 2 visibles (« Cadrage & Collecte », « Analyse & Recommandations »). Étapes 3 et 4 à fournir.
22. **Équipe, partenaires, références clients** : aucun élément dans les captures, donc emplacements `[À FOURNIR]` ou pas de section du tout. AGPAOC et PMAESA : leurs logos peuvent-ils être affichés (autorisation) ?
23. **Sponsoring COPAF** (« Devenir Sponsor ») : à conserver ? Avec quel contact ou dossier ?

## E. Inscription et légal
24. **Textes à fournir** : conditions d'inscription (annulation, report, remboursement), politique de confidentialité, mentions légales (raison sociale, numéro d'immatriculation, siège, directeur de publication, hébergeur Hostinger).
25. **Capacité par session** (compteur de places) : `[À FOURNIR]`.
26. **Mention « confirmée après réception de la proforma réglée »** : à valider.
27. **E-mails** : expéditeur des confirmations (ex. `no-reply@crfperfection.pro`) et fournisseur d'envoi (Resend, Brevo, SMTP Hostinger ?). L'ancien site utilisait EmailJS. Le DNS (SPF/DKIM) doit être configuré par la personne qui gère le domaine.
28. **Supabase** : projet existant à utiliser ou nouveau projet ? Qui sont les administrateurs (adresses à inviter dans Supabase Auth) ?
29. **Hostinger** : confirmer que le déploiement FTP se fait sur le compte de crfperfection.pro (secrets `FTP_*` à créer dans le nouveau dépôt).

## F. Catalogue 2027 : points connus à signaler (non tranchés)
30. Coût et hébergement absents des fiches C1 à C9 (on affichera « Sur demande »).
31. La Rubrique 4 oublie les DSI.
32. Renvois du tableau « Enjeux 2027 » probablement faux.
33. Tableau « Projets publics » incohérent avec les fiches B.
34. Chiffre Suez à vérifier.
35. Sessions parallèles à Mombasa et Dar es Salaam sur des publics qui se recoupent.
36. Séminaire cyber T2 : juillet dans le Word, septembre sur l'affiche.
> Ces points seront vérifiés et complétés dès la réception du Word.

## G. Traduction anglaise
37. La liste des pages et sections `TODO-EN` sera tenue ici à partir de l'étape 3.
