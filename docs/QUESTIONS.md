# QUESTIONS : éléments manquants, contradictoires ou périmés

Statut : étape 1 (système de design + accueil). Mise à jour après réception du Word, du PDF du catalogue, des logos et des 4 albums photo COPAF 2026.

## 0. Réglé par les fichiers reçus
- Catalogue Word + PDF reçus : 22 fiches extraites automatiquement (`scripts/extract-catalogue.py` → `content/catalogue/formations.raw.json`), sans réécriture.
- Coordonnées retenues (source : PDF du catalogue 2027) : +229 01 69 30 30 19 · +1 (240) 978-4155 · contact@crfperfection.pro · contact@copaf-ports.com · crfperfection.pro.
- Agences : Bénin, Côte d'Ivoire, Maroc, Togo (Word + PDF) ; siège aux États-Unis. Adresse postale non affichée tant que la bonne n'est pas confirmée (question 9).
- DG : « Dr William Odah, Directeur Général » (graphie du PDF) ; éditorial 2027 repris du PDF.
- Logos : seules versions disponibles (matricielles). Fond supprimé sans retouche du dessin (`public/logos/`). Bruit visible si le logo couleur est posé sur fond sombre : on ne l'utilise que sur fond clair, et le blanc sur fond sombre.
- Banque d'images : 4 albums COPAF 2026 (936 photos) + photos du PDF. 41 photos retenues (`images/source/`).
- Chiffres, certifications ISO/QUALIOPI et témoignages de l'ancien site : non repris (aucune preuve fournie).

## 0 ter. Mise en ligne (étapes 2–4 accélérées à la demande du DG)
- **Couleurs** : le rouge vif n'est plus utilisé (demande du DG : trop de rouge). Bleu nuit dominant ; bordeaux réservé aux boutons principaux et à un mot accentué sur fond clair. Le problème de contraste du rouge vif disparaît.
- **Supabase** : nouveau projet « crf-perfection-site » (UE). Tables contacts, inscriptions, participants, inscription_items, formations (22 codes, tarifs du Word). RLS active, aucune lecture publique (testé). Envoi via fonctions validées côté serveur (honeypot, limitation de débit, contrôle des champs, prix capturé côté serveur).
- **E-mails de confirmation et de notification : NON ACTIFS.** Il faut un service d'envoi (Resend, Brevo…) et une clé API, plus SPF/DKIM sur crfperfection.pro. En attendant, les demandes sont consultables dans /admin.
- **Admin** : créer le(s) compte(s) dans Supabase (Authentication → Users), puis m'indiquer l'e-mail à ajouter à la table admins.
- **Capacités par session** : colonne `capacite` de la table formations, à renseigner.
- **Version anglaise** : non livrée (sélecteur EN affiché « en préparation »). TODO-EN : toutes les pages.
- **Mentions légales, confidentialité, conditions d'inscription** : modèles publiés avec des [À FOURNIR].

## 0 bis. Points de l'étape 1
- **Contraste de la charte** : le rouge vif #C8202F sur bleu nuit #1B2A41 donne 2,55:1, sous le minimum WCAG AA (3:1 pour les grands titres, 4,5:1 pour le texte). Choix appliqué : mot accentué des titres en rouge vif (comme exigé) ; mini-étiquettes en pastille rouge vif avec texte blanc (5,67:1, conforme, comme la couverture du PDF). Lighthouse signalera les mots accentués. À trancher : garder (exception assumée) ou éclaircir uniquement la teinte de ces mots.
- **Bandeau « Recherche appliquée »** de l'accueil : aucun texte source dans le Word (les 4 rubriques n'incluent pas la recherche). Texte provisoire : « Études au service des décisions des autorités portuaires. » À valider ou remplacer.
- **Droit à l'image** : les photos COPAF montrent des personnes identifiables. Confirmer que leur usage sur le site est couvert (accord des participants / mention).
- **Catalogue « 2027 - 2028 »** sur la couverture du PDF vs « 2027 » dans le Word et le brief.
- **Webinaires W1/W2** : le Word ne donne ni objectif ni contenu détaillé (seulement public, date, coût). Les fiches W resteront courtes sauf texte fourni.
- **Codes C1/C3 et C2/C8** : sessions parallèles à Dar es Salaam (18–19 et 20–22 oct.) ; C4/C6 en parallèle à Mombasa (27–29 sept.) — déjà signalé.

**[BLOQUANT]** = nécessaire avant l'étape 1 ou 2.

## A. Fichiers et environnement
1. **Dossier de travail** : le projet est dans un dossier séparé `/home/user/crf-perfection`, avec son propre historique git. Le portfolio n'est pas modifié. Pour publier, il faudra un dépôt GitHub dédié (ex. `crf-perfection-site`) que vous créez et me donnez : je ne peux pas en créer un moi-même.
2. **[BLOQUANT étape 2] Catalogue Word** `CRF_Perfection_Catalogue_Formation_2027_Finalisé.docx` : pas encore reçu. C'est la source unique des 22 formations.
3. **[BLOQUANT étape 1] Banque `/images/`** : pas encore reçue (ports, conteneurs, salles de formation, dirigeants). Les images reçues sont les logos et les captures des menus.
4. **PDF du catalogue 2027** (bouton « Télécharger le PDF ») : pas encore reçu.
5. **Les 2 affiches de référence de la charte** : pas encore reçues (facultatif, mais utile pour les lignes diagonales et les bandeaux).
6. **Captures restantes** (facultatif) : les 5 sous-pages « Domaines d'Expertise » (Marketing Digital, IA, Management de Projets Numériques, Management des RH, Business Thérapie), la Politique de Confidentialité et les Conditions d'Utilisation. Utiles pour relever leurs URL (redirections 301) et le texte légal existant.
7. **Logos** : reçus en image matricielle sans transparence, à 600 px de large au maximum. La version blanche est posée sur un bleu `#182A40` légèrement différent de `#1B2A41`. Il faut des versions **SVG** (ou PNG transparent ≥ 2 000 px) : logo complet couleur, logo complet blanc, symbole seul. Je ne redessine pas le logo.

## B. Identité et coordonnées (contradictions)
8. **Téléphone** : `+1 (240) 978-4155` (téléphone et WhatsApp) sur tout l'ancien site ; `+229 01 69 30 30 19` dans le brief. Que faut-il afficher ? Le WhatsApp reste-t-il le numéro américain ?
9. **Adresse** : deux adresses américaines. « 1901 Pennsylvania Avenue NW, Washington D.C. 20006 » (page Contact, « siège social ») et « 10411 Greenbelt road Uperoom, MD, 20706 » (pied de page ; « Uperoom » semble être une coquille). Laquelle afficher ? Y a-t-il des adresses pour les agences africaines ? La carte Google Maps doit-elle rester ?
10. **Pays des agences** : ancien site « Bénin, Côte d'Ivoire, Togo » ; Word (d'après le brief) « Bénin, Côte d'Ivoire, Maroc, Togo ».
11. **Horaires** : « Lun–Ven 8h00–19h00, Sam 9h00–14h00, Dim fermé ». Ces horaires sont-ils toujours valables, et dans quel fuseau horaire (Washington ou Cotonou) ?
12. **Nom du DG** : « Dr Oloutayo William Odah » (éditorial) et « Dr. William Odah, Directeur Général » (page Équipe). Quelle graphie utiliser ?
13. **Équipe** : l'ancien site présente le Dr William Odah et Alida Ayena (Assistante de Direction). Faut-il garder la section Équipe ? Avec quelles personnes et quelles photos (à fournir dans `/images/`, avec leur accord) ?
14. **Réseaux sociaux** : URL LinkedIn, Twitter/X et Facebook à fournir. Le bouton WhatsApp flottant est-il à conserver ?
15. **Signification du sigle** : « CRF = Centre de Recherche et de Formation » (nouveau logo et page Contact). Je l'utilise comme sous-titre institutionnel. À confirmer.

## C. Affirmations de l'ancien site retirées sauf preuve
16. **Ancienneté contradictoire** : fondation en 2006 (frise), « 15 ans d'excellence » (accueil), « 18+ années » (À propos), « 5+ ans d'expertise » (Contact), « plus de dix ans » (brief). Quelle date de création retenir ?
17. **Chiffres** contradictoires et non sourcés : 850+ / 1000+ / 5000+ / 500+ professionnels formés ; 45+ programmes ; 12 M€ de projets ; 98 % / 95 % de satisfaction ; 200+ entreprises ; 150+ missions ; 100+ projets ; 50+ experts ; 20+ / 25+ pays ; 500+ études ; 15K+ répondants ; +150 % de ROI. L'accueil affirme « Chiffres audités et mis à jour pour l'exercice 2024 ». Existe-t-il un document d'audit ? Sinon, aucun chiffre ne sera affiché.
18. **Certifications** : « ISO 9001 », « Certifié QUALIOPI », « Méthodologie Certifiée ISO », « certifications reconnues ». QUALIOPI est une certification française réservée aux organismes de formation enregistrés en France. Merci de fournir les numéros de certificat et les organismes certificateurs, sinon ces mentions sont retirées.
19. **Témoignages** : l'accueil affiche 6 témoignages nominatifs (Dr. Amadou Diallo, Mme Sarah Mensah, Jean-Pierre Kouamé, M. Ibrahima Sow, Dra. Fatoumata Bamba, Eng. Samuel Adeyemi). Certains citent des entreprises réelles (Sifca Groupe, Atlantique Télécom). Ce sont-ils de vrais clients, avec un accord écrit ? Sinon, ils sont retirés : un faux témoignage attribué à une entreprise réelle expose CRF Perfection juridiquement.
20. **Études de cas chiffrées** (« Groupe Industriel Africain 95 % », etc.) : citables ou non ?
21. **Engagements de service** : temps de réponse « garantis » (2 h / 24 h / 48 h), « support 24/7 pour clients premium », « Diagnostic Gratuit », « Consultation Gratuite ». Sont-ils réels et tenables ?
22. **COPAF 2026** : l'ancien site annonce « 500+ participants, 25+ pays, 50+ conférenciers, 3 jours ». Je retiens la formule du brief, « 5 autorités portuaires, 4 pays ; 2 jours de conférence + 1 jour d'immersion ».
23. **Visuels tiers** : l'image « STRATEGIC PARTNERS INC. » (logo d'une autre entreprise) et les photos génériques de la page Ressources ne seront pas reprises.

## D. Contenu à décider
24. **Blog / Actualités** : le menu annonce un blog, mais aucun article n'est visible. Existe-t-il des articles à reprendre ? Sinon, pas de page Actualités.
25. **Domaines hors ports** : « Business Thérapie / Thérapie d'Entreprise », Marketing Digital, Soft Skills et pôle RH généraliste. Le nouveau site cible les autorités portuaires. Faut-il les garder (et où), ou s'en tenir au catalogue 2027 ?
26. **Éditorial du DG** (daté 2026) : à réécrire pour 2027, ou à retirer ?
27. **Mission, vision, valeurs** : je propose de reprendre la mission et les 4 valeurs (Passion, Collaboration, Innovation, Intégrité), dans un ton plus sobre et sans superlatifs. La « Vision 2030 » (« référence mondiale », « 20+ pays ») est retirée, sauf avis contraire.
28. **Méthodologie de recherche** : « 4 étapes » sont annoncées, mais seules 2 sont visibles. Les étapes 3 et 4 sont à fournir.
29. **Partenaires institutionnels** (AGPAOC, PMAESA) : peut-on afficher leurs noms et logos (autorisation, fichiers) ?
30. **Sponsoring COPAF** (« Devenir Sponsor ») : à conserver ? Vers quel contact ou dossier ?
31. **Texte animé de l'accueil** (« Capital Humai… ») : sans objet sur le nouveau site, qui n'aura pas d'animation gadget.

## E. Formulaires, inscription et légal
32. **Liste « Service concerné »** du formulaire de contact : les options sont inconnues. Je propose les 4 rubriques, plus « Formation du catalogue (code) » et « Autre ».
33. **Textes à fournir** : conditions d'inscription (annulation, report, remboursement), politique de confidentialité, mentions légales (raison sociale, immatriculation, siège, directeur de publication, hébergeur).
34. **Capacité par session** (compteur de places) : `[À FOURNIR]`.
35. **Mention « confirmée après réception de la proforma réglée »** : à valider.
36. **E-mails** : expéditeur des confirmations (ex. `no-reply@crfperfection.pro`) et service d'envoi. L'ancien site utilisait EmailJS ; je propose Resend ou Brevo via une Edge Function Supabase. Il faudra configurer SPF/DKIM sur le domaine.
37. **Supabase** : projet existant ou nouveau ? Quelles adresses administrateurs inviter ?
38. **Hostinger** : confirmer que le déploiement FTP se fait sur l'hébergement de crfperfection.pro (secrets `FTP_*` à créer dans le nouveau dépôt).

## F. Catalogue 2027 : points connus à signaler (non tranchés)
39. Coût et hébergement absents des fiches C1 à C9 (affichés « Sur demande »).
40. La Rubrique 4 oublie les DSI.
41. Renvois du tableau « Enjeux 2027 » probablement faux.
42. Tableau « Projets publics » incohérent avec les fiches B.
43. Chiffre Suez à vérifier.
44. Sessions parallèles à Mombasa et Dar es Salaam sur des publics qui se recoupent.
45. Séminaire cyber T2 : juillet dans le Word, septembre sur l'affiche.
> Ces points seront vérifiés, et d'autres ajoutés, à la réception du Word.

## G. Traduction anglaise
46. La liste des pages et sections `TODO-EN` sera tenue ici à partir de l'étape 3.
