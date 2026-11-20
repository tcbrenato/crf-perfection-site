import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/lib/head';
import { Picture } from '@/components/Picture';
import { SITE, RUBRIQUES, EN_BREF, EDITORIAL } from '@content/site';
import { COPAF_2026, COPAF_2027 } from '@content/copaf';
import { FORMATIONS } from '@content/catalogue';
import { PROJETS_PUBLICS, DEMARCHE, PARTIE3 } from '@content/catalogue/contexte';
import { organisationJsonLd } from '@/lib/jsonld';

function PageHero({ eyebrow, children, lead, id }: { eyebrow: string; children: React.ReactNode; lead?: string; id: string }) {
  return (
    <section className="section section--dark on-dark page-hero" aria-labelledby={id}>
      <div className="container hero__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1 id={id} className="h1">{children}</h1>
        {lead && <p className="hero__lead">{lead}</p>}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="section section--dark on-dark">
      <div className="container cta">
        <h2 className="h2">Former. Conseiller. Faire <span className="accent">rayonner.</span></h2>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--white">Parlons de votre projet</Link>
          <Link to="/catalogue-2027" className="btn btn--primary">Catalogue 2027 <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

/* — Qui sommes-nous — */
export function About() {
  return (
    <>
      <Seo path="/qui-sommes-nous" title="Qui sommes-nous" description="CRF Perfection, Centre de Recherche et de Formation : cabinet international de formation, de conseil stratégique et de recherche appliquée, basé aux États-Unis, avec des agences au Bénin, en Côte d'Ivoire, au Maroc et au Togo." jsonLd={[organisationJsonLd()]} />
      <PageHero id="ab-t" eyebrow="Qui sommes-nous" lead={EN_BREF[0].texte}>CRF Perfection en <span className="accent">bref</span></PageHero>
      <section className="section section--light">
        <div className="container">
          <ul className="npanel-list box box--narrow">
            {EN_BREF.map((b, i) => <li key={b.titre} className="npanel"><span className="npanel__icon" aria-hidden="true">{i + 1}</span><div><h2 className="npanel__title">{b.titre}</h2><p className="npanel__text">{b.texte}</p></div></li>)}
          </ul>
        </div>
      </section>
      <section id="editorial" className="section section--white" aria-labelledby="ed-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{EDITORIAL.surtitre}</span>
            <h2 id="ed-t" className="h2">{EDITORIAL.titre[0]}<span className="accent">{EDITORIAL.titre[1]}</span>{EDITORIAL.titre[2]}</h2>
          </div>
          <div className="box box--narrow">
            <div className="edito">
              <p><strong>{EDITORIAL.salutation}</strong></p>
              {EDITORIAL.paragraphes.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
              <div className="quote__sign"><strong>{EDITORIAL.signature}</strong><span>{EDITORIAL.fonction}</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--light" aria-labelledby="val-t">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Nos valeurs</span><h2 id="val-t" className="h2">Ce qui guide notre <span className="accent">action</span></h2></div>
          <ul className="npanel-list box box--narrow" role="list">
            {[['Passion', 'Dévouement total à l’excellence'], ['Collaboration', 'Travail d’équipe et synergie'], ['Innovation', 'Créativité et amélioration continue'], ['Intégrité', 'Éthique et transparence']].map(([t, d]) => (
              <li key={t} className="npanel"><span className="npanel__icon" aria-hidden="true">{t[0]}</span><div><h3 className="npanel__title">{t}</h3><p className="npanel__text">{d}</p></div></li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}

/* — Nos activités — */
export function Activites() {
  return (
    <>
      <Seo path="/nos-activites" title="Nos activités : quatre rubriques" description="Conférence internationale (COPAF), diagnostic et conseil stratégique, formation sur mesure in-house et catalogue à la carte : le plan d'action 2027 de CRF Perfection." />
      <PageHero id="ac-t" eyebrow="Structuration de nos activités" lead="Quatre rubriques pour le plan d’action 2027.">Quatre rubriques, un seul <span className="accent">positionnement</span></PageHero>
      {RUBRIQUES.map((r, i) => (
        <section key={r.num} className={`section ${i % 2 ? 'section--white' : 'section--light'}`} aria-labelledby={`r${r.num}`}>
          <div className="container">
            <div className="box box--narrow"><div className="prose" style={{ maxWidth: 'none' }}>
            <span className="code code--navy" aria-hidden="true" style={{ justifySelf: 'start' }}>Rubrique {r.num}</span>
              <h2 id={`r${r.num}`} className="h2">{r.titre}</h2>
              <p className="lead">{r.intitule}</p>
              <h3 className="fiche__h">Description</h3><p>{r.description}</p>
              <h3 className="fiche__h">Objectif stratégique</h3><p>{r.objectif}</p>
              <Link to={r.lien} className="link-arrow">En savoir plus <ArrowRight aria-hidden="true" /></Link>
            </div></div>
          </div>
        </section>
      ))}
      <Cta />
    </>
  );
}

/* — Diagnostic & conseil — */
export function Diagnostic() {
  const r = RUBRIQUES[1];
  const c = FORMATIONS.filter((f) => ['C1', 'C2', 'C3'].includes(f.code));
  return (
    <>
      <Seo path="/nos-activites/diagnostic-conseil" title="Diagnostic et conseil stratégique" description="Audits de maturité digitale, audit de cyber-résilience, optimisation des processus logistiques et gouvernance des données : missions de diagnostic sur site pour les ports africains." />
      <PageHero id="dg-t" eyebrow="Rubrique 2" lead={r.intitule}>Diagnostic et <span className="accent">conseil</span> stratégique</PageHero>
      <section className="section section--light">
        <div className="container split">
          <div className="prose">
            <h2 className="h2">Une feuille de route pour chaque port</h2>
            <p>{r.description}</p>
            <h3 className="fiche__h">Objectif stratégique</h3><p>{r.objectif}</p>
            <h3 className="fiche__h">Notre approche</h3>
            <p>Une collaboration étroite avec vos équipes, alliant une vision des tendances du secteur et une expertise opérationnelle pour des solutions concrètes et durables.</p>
            <Link to="/contact?type=devis" className="btn btn--primary">Demander un diagnostic</Link>
          </div>
          <div className="photo"><Picture name="copaf26-jour3-immersion-244" alt="Lecture de la maquette du port de Casablanca lors de la COPAF 2026" sizes="(max-width: 900px) 90vw, 45vw" /></div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Formations associées</span><h2 className="h2">Faire le diagnostic avec vos <span className="accent">équipes</span></h2></div>
          <ul className="grid grid--3" role="list">
            {c.map((f) => <li key={f.code} className="card"><span className="badge">{f.reference}</span><h3 className="h3">{f.intitule}</h3><p className="card__text">{f.objectif}</p><Link to={`/formations/${f.slug}`} className="card__foot link-arrow">Voir la fiche <ArrowRight aria-hidden="true" /></Link></li>)}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}

/* — Recherche appliquée — (contenu de l'ancien site, sans chiffres non sourcés) */
export function Recherche() {
  const services = [
    ['Études de marché', 'Analyses approfondies des tendances, opportunités et dynamiques de votre secteur pour des décisions éclairées.'],
    ['Enquêtes sectorielles', 'Collecte de données primaires auprès de vos cibles pour une compréhension fine de leurs besoins et comportements.'],
    ['Analyses socio-économiques', 'Évaluation des impacts sociaux et économiques pour guider vos projets de développement et investissements.'],
    ['Veille stratégique', 'Surveillance continue de votre environnement pour anticiper les changements et saisir les opportunités.'],
  ];
  return (
    <>
      <Seo path="/nos-activites/recherche-appliquee" title="Recherche appliquée" description="Études de marché, enquêtes sectorielles, analyses socio-économiques et veille stratégique pour éclairer les décisions des autorités portuaires." />
      <PageHero id="rc-t" eyebrow="Recherche appliquée" lead="Des analyses rigoureuses et des données fiables pour éclairer vos décisions stratégiques.">Des données fiables pour <span className="accent">décider</span></PageHero>
      <section className="section section--light">
        <div className="container">
          <ul className="grid grid--4" role="list">{services.map(([t, d]) => <li key={t} className="card"><h2 className="h3">{t}</h2><p className="card__text">{d}</p></li>)}</ul>
          <div className="prose" style={{ marginTop: 'var(--s-6)' }}>
            <h2 className="h3">Notre méthodologie</h2>
            <p><strong>Cadrage et collecte :</strong> définition des objectifs et recueil de données rigoureuses. <strong>Analyse et recommandations :</strong> traitement statistique et recommandations directement applicables.</p>
            <Link to="/contact?type=devis" className="btn btn--primary">Demander une étude</Link>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

/* — Formations sur mesure — */
export function SurMesure() {
  const b = FORMATIONS.filter((f) => f.famille === 'B');
  const r = RUBRIQUES[2];
  return (
    <>
      <Seo path="/formations-sur-mesure" title="Formations sur mesure (in-house) pour les ports" description="Six programmes sur mesure B1 à B6 pour les projets des ports africains : mise en service, concessions, modernisation, ports secs, flux numériques, port vert. Sur devis, après diagnostic." />
      <PageHero id="sm-t" eyebrow="Rubrique 3 · In-house" lead={r.intitule}>Formations <span className="accent">sur mesure</span> pour les ports</PageHero>
      <section className="section section--light">
        <div className="container prose">
          <p className="lead">{r.description}</p>
          <p>{PARTIE3.difference} {PARTIE3.livraison}</p>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="dm-t">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Méthode</span><h2 id="dm-t" className="h2">Comment nous construisons un programme pour un <span className="accent">port</span></h2></div>
          <ol className="npanel-list box box--narrow">{DEMARCHE.map((d, n) => <li key={d.titre} className="npanel"><span className="npanel__icon" aria-hidden="true">{n + 1}</span><div><strong className="npanel__title">{d.titre}</strong><p className="npanel__text">{d.texte}</p></div></li>)}</ol>
        </div>
      </section>
      <section className="section section--light">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Séries par projet de port</span><h2 className="h2">Six programmes sur <span className="accent">devis</span></h2></div>
          <ul className="grid grid--3" role="list">
            {b.map((f) => <li key={f.code} className="card"><span className="badge">{f.reference}</span><h3 className="h3">{f.intitule}</h3><p className="card__text">{f.objectif}</p><p className="muted"><strong>Livrable :</strong> {f.livrable}</p>
              <div className="card__foot btn-row"><Link to={`/contact?type=devis&code=${f.code}`} className="btn btn--primary">Demander un devis</Link><Link to={`/formations/${f.slug}`} className="link-arrow">Fiche <ArrowRight aria-hidden="true" /></Link></div></li>)}
          </ul>
          <h3 className="h3" style={{ marginTop: 'var(--s-6)' }}>Projets publics concernés</h3>
          <div className="table-wrap"><table className="table">
            <thead><tr><th scope="col">Projet public cité</th><th scope="col">Pays</th><th scope="col">Programmes</th></tr></thead>
            <tbody>{PROJETS_PUBLICS.map((p) => <tr key={p.projet}><td>{p.projet}</td><td>{p.pays}</td><td><span className="pills">{p.codes.map((c) => <span key={c} className="code code--navy">{c}</span>)}</span></td></tr>)}</tbody>
          </table></div>
        </div>
      </section>
      <Cta />
    </>
  );
}

/* — COPAF — */
export function Copaf() {
  return (
    <>
      <Seo path="/copaf" title="COPAF : Conférence des Ports Africains" description="COPAF 2026 à Casablanca (19–21 octobre) : Smart Port africain, IA et cybersécurité, sous l'égide de l'AGPAOC. COPAF 2027 : 2e édition en partenariat avec la PMAESA." />
      <section className="section section--dark on-dark hero" aria-labelledby="cp-t">
        <div className="hero__media"><Picture name="copaf26-jour3-immersion-142" alt="Participants de la COPAF 2026 sur la terrasse surplombant le port de Casablanca" priority sizes="(max-width: 960px) 100vw, 62vw" /></div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">{COPAF_2026.surtitre}</span>
            <h1 id="cp-t" className="h1">{COPAF_2026.titre[0]}<span className="accent">{COPAF_2026.titre[1]}</span>{COPAF_2026.titre[2]}</h1>
            <ul className="pill-list" role="list">{COPAF_2026.points.map((p) => <li key={p} className="chip">{p}</li>)}</ul>
            <div className="btn-row">
              <a href={SITE.copafUrl} target="_blank" rel="noopener" className="btn btn--white">copaf-ports.com<span className="sr-only"> (nouvel onglet)</span></a>
              <Link to="/inscription" className="btn btn--primary">Pré-inscription COPAF 2027</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--light" aria-labelledby="cp-p">
        <div className="container">
          <div className="section-head"><span className="eyebrow">COPAF 2026</span><h2 id="cp-p" className="h2">{COPAF_2026.bilan}</h2></div>
          <ul className="grid grid--4" role="list">{COPAF_2026.participants.map((p) => <li key={p.pays} className="card"><h3 className="h3">{p.pays}</h3><p className="card__text">{p.detail}</p></li>)}</ul>
        </div>
      </section>
      <section className="section section--white">
        <div className="container gallery">
          {[['copaf26-jour1-003', 'Photo de groupe, jour 1'], ['copaf26-jour3-immersion-095', 'Le port de Casablanca'], ['copaf26-jour2-003', 'Chevalets des délégations'], ['copaf26-jour3-immersion-244', 'Visite de la maquette du port'], ['copaf26-jour3-immersion-097', 'Le port de Casablanca vu de la tour'], ['copaf26-jour3-immersion-222', 'Présentation de la maquette du port']].map(([n, a]) => (
            <figure key={n} className="photo"><Picture name={n} alt={`COPAF 2026 : ${a}`} sizes="(max-width: 700px) 90vw, 30vw" /></figure>
          ))}
        </div>
      </section>
      <section className="section section--dark on-dark">
        <div className="container cta">
          <span className="eyebrow">COPAF 2027 · 2ᵉ édition</span>
          <h2 className="h2">En partenariat avec la <span className="accent">PMAESA</span></h2>
          <p className="lead">{COPAF_2027.annonce} {RUBRIQUES[0].description}</p>
          <div className="btn-row"><Link to="/inscription" className="btn btn--white">Manifester mon intérêt</Link><a href={`mailto:${SITE.contact.emailCopaf}`} className="btn btn--outline">{SITE.contact.emailCopaf}</a></div>
        </div>
      </section>
    </>
  );
}

/* — Pages légales (modèles à compléter) — */
export function Legal({ kind }: { kind: 'mentions' | 'confidentialite' | 'conditions' }) {
  const T = { mentions: 'Mentions légales', confidentialite: 'Politique de confidentialité', conditions: 'Conditions d’inscription' }[kind];
  const path = { mentions: '/mentions-legales', confidentialite: '/confidentialite', conditions: '/conditions-inscription' }[kind];
  return (
    <>
      <Seo path={path} title={T} description={`${T} du site crfperfection.pro.`} />
      <section className="section section--light">
        <div className="container prose legal">
          <h1 className="h2">{T}</h1>
          <p className="warn">Modèle à compléter et à valider par CRF Perfection.</p>
          {kind === 'mentions' && <>
            <h2 className="h3">Éditeur</h2><p>CRF Perfection. Raison sociale, forme juridique, numéro d’immatriculation et adresse du siège : [À FOURNIR]. Contact : {SITE.contact.email} · {SITE.contact.telephones[0].affiche}.</p>
            <h2 className="h3">Directeur de la publication</h2><p>[À FOURNIR]</p>
            <h2 className="h3">Hébergement</h2><p>Hostinger International Ltd. Coordonnées complètes : [À FOURNIR].</p>
            <h2 className="h3">Propriété intellectuelle</h2><p>Les contenus, logos et photographies du site sont la propriété de CRF Perfection ou utilisés avec autorisation. Toute reproduction sans accord préalable est interdite.</p>
          </>}
          {kind === 'confidentialite' && <>
            <h2 className="h3">Données collectées</h2><p>Les formulaires de contact, de devis et d’inscription collectent les informations que vous saisissez (identité, fonction, organisation, coordonnées, participants, formations choisies) ainsi que la date de votre consentement.</p>
            <h2 className="h3">Finalités</h2><p>Répondre à votre demande, établir la facture proforma et organiser les formations. Aucune donnée n’est vendue ni cédée.</p>
            <h2 className="h3">Conservation et hébergement</h2><p>Les données sont stockées chez Supabase (Union européenne, région eu-west-1), avec un accès réservé aux administrateurs de CRF Perfection. Durée de conservation : [À FOURNIR].</p>
            <h2 className="h3">Vos droits</h2><p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données à {SITE.contact.email}.</p>
            <h2 className="h3">Stockage local</h2><p>Le site enregistre dans votre navigateur votre sélection de formations et le brouillon du formulaire d’inscription. Aucun cookie publicitaire ni outil de mesure d’audience n’est utilisé.</p>
          </>}
          {kind === 'conditions' && <>
            <h2 className="h3">Nature de la demande</h2><p>Le formulaire en ligne constitue une demande d’inscription. Elle est confirmée après réception de la facture proforma réglée.</p>
            <h2 className="h3">Tarifs</h2><p>Les coûts de participation sont ceux du catalogue 2027, par participant. L’hébergement n’est pas inclus.</p>
            <h2 className="h3">Règlement</h2><p>Par virement bancaire sur facture proforma émise par CRF Perfection.</p>
            <h2 className="h3">Annulation, report, remplacement d’un participant</h2><p>[À FOURNIR]</p>
          </>}
        </div>
      </section>
    </>
  );
}
