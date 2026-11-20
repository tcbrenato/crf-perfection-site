import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, SearchCheck, Anchor, FlaskConical, Download } from 'lucide-react';
import { Seo } from '@/lib/head';
import { Picture } from '@/components/Picture';
import { SITE, RUBRIQUES, EN_BREF, EDITORIAL } from '@content/site';
import { COPAF_2026, COPAF_2027 } from '@content/copaf';
import { SESSIONS, CHIFFRES, formatSession, FAMILLES } from '@content/catalogue';
import { organisationJsonLd } from '@/lib/jsonld';

const BANDEAUX = [
  { icon: GraduationCap, titre: 'Formation', texte: 'Catalogue 2027 à la carte et programmes sur mesure.', to: '/catalogue-2027' },
  { icon: SearchCheck, titre: 'Diagnostic & conseil', texte: 'Audits de maturité digitale et diagnostics des écosystèmes portuaires.', to: '/nos-activites/diagnostic-conseil' },
  { icon: Anchor, titre: 'COPAF', texte: 'La Conférence des Ports Africains : 2ᵉ édition en 2027 avec la PMAESA.', to: '/copaf' },
  { icon: FlaskConical, titre: 'Recherche appliquée', texte: 'Études au service des décisions des autorités portuaires.', to: '/nos-activites/recherche-appliquee' },
];

/** Prochaines sessions datées (calculées depuis le catalogue). */
const PROCHAINES = SESSIONS.filter((x) => x.session.fin >= new Date().toISOString().slice(0, 10)).slice(0, 6);

export function Home() {
  return (
    <>
      <Seo
        path="/"
        title="CRF Perfection : formation et conseil pour les autorités portuaires africaines"
        description="Cabinet international de formation, de conseil stratégique et de recherche appliquée pour les ports africains : IA, cybersécurité, gouvernance, Smart Ports, décarbonation. Catalogue 2027 et COPAF."
        jsonLd={[organisationJsonLd()]}
      />

      {/* 1. Hero */}
      <section className="section section--dark hero on-dark" aria-labelledby="hero-titre">
        <div className="hero__media">
          <Picture name="copaf26-jour3-immersion-095" alt="Vue aérienne du port de Casablanca depuis la tour de l'Agence nationale des ports, lors de la COPAF 2026" priority sizes="(max-width: 960px) 100vw, 62vw" position="60% 50%" />
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">{SITE.metiers}</span>
            <h1 id="hero-titre" className="hero__title">
              Formation et <span className="accent">conseil</span> pour les autorités portuaires
            </h1>
            <p className="hero__lead">{EN_BREF[2].texte}</p>
            <div className="btn-row">
              <Link to="/catalogue-2027" className="btn btn--primary">Découvrir le catalogue 2027 <ArrowRight aria-hidden="true" /></Link>
              <Link to="/contact" className="btn btn--white">Parlons de votre projet</Link>
            </div>
          </div>
          <ul className="hero__aside bandeau-list" aria-label="Nos domaines d'intervention" role="list">
            {BANDEAUX.map(({ icon: Icon, titre, texte, to }) => (
              <li key={titre}>
                <Link to={to} className="bandeau">
                  <span className="bandeau__icon"><Icon aria-hidden="true" /></span>
                  <span>
                    <span className="bandeau__title">{titre}</span>
                    <span className="bandeau__text" style={{ display: 'block' }}>{texte}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Thèmes */}
      <section className="themes-band section--white" aria-label="Thèmes du catalogue 2027">
        <div className="container">
          <span className="eyebrow">Les thèmes de 2027</span>
          <ul className="themes">{SITE.themes.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      {/* 3. Les quatre rubriques */}
      <section className="section section--light" aria-labelledby="rubriques-titre">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Structuration de nos activités</span>
            <h2 id="rubriques-titre" className="h2">Quatre rubriques, un seul <span className="accent">positionnement</span></h2>
            <p className="lead">Le plan d’action 2027 de CRF Perfection, au service des autorités portuaires africaines.</p>
          </div>
          <ul className="grid grid--4" role="list" style={{ listStyle: 'none' }}>
            {RUBRIQUES.map((r) => (
              <li key={r.num} style={{ display: 'flex' }}>
                <Link to={r.lien} className="card card--link" style={{ flex: 1 }}>
                  <span className="card__num" aria-hidden="true">{r.num}</span>
                  <h3 className="h3">{r.court}</h3>
                  <p className="card__text">{r.resume}</p>
                  <span className="card__foot link-arrow">En savoir plus <ArrowRight aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Formations à venir */}
      <section className="section section--white" aria-labelledby="avenir-titre">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Catalogue 2027</span>
            <h2 id="avenir-titre" className="h2">Les prochaines <span className="accent">sessions</span></h2>
            <p className="lead">
              {CHIFFRES.formations} formations réparties en {CHIFFRES.familles} familles, dans {CHIFFRES.lieux} villes et en ligne.
              Chaque formation porte un code, à rappeler lors de l’inscription.
            </p>
          </div>
          <ul className="grid grid--3" role="list" style={{ listStyle: 'none' }}>
            {PROCHAINES.map(({ formation: f, session: s }) => (
              <li key={f.code + s.debut} className="card upcoming">
                <div className="upcoming__head">
                  <span className="badge">{f.reference}</span>
                  <span className="upcoming__date">{formatSession(s)}</span>
                </div>
                <h3 className="upcoming__title">{f.intitule}</h3>
                <dl className="facts">
                  <div><dt>Lieu</dt><dd>{s.ville}{s.pays !== 'Webinaire' ? ` (${s.pays})` : ''}</dd></div>
                  <div><dt>Durée</dt><dd>{f.duree}</dd></div>
                  <div><dt>Cible</dt><dd>{f.cible}</dd></div>
                  <div><dt>Coût</dt><dd>{f.cout ?? 'Sur demande'}</dd></div>
                </dl>
                <Link to={`/formations/${f.slug}`} className="card__foot link-arrow">
                  Voir la fiche <span className="sr-only">{f.reference}</span><ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
            <Link to="/catalogue-2027" className="btn btn--primary">Voir tout le catalogue <ArrowRight aria-hidden="true" /></Link>
            <a href="/catalogue/CRF_Perfection_Catalogue_Formation_2027.pdf" className="btn btn--outline" download>
              <Download aria-hidden="true" /> Télécharger le catalogue PDF
            </a>
          </div>
          <p className="sr-only">Familles : {Object.values(FAMILLES).map((x) => x.nom).join(', ')}.</p>
        </div>
      </section>

      {/* 5. COPAF */}
      <section className="section section--dark on-dark" aria-labelledby="copaf-titre">
        <div className="container split">
          <div className="prose" style={{ gap: 'var(--s-3)' }}>
            <span className="eyebrow">{COPAF_2026.surtitre}</span>
            <h2 id="copaf-titre" className="h2">
              {COPAF_2026.titre[0]}<span className="accent">{COPAF_2026.titre[1]}</span>{COPAF_2026.titre[2]}
            </h2>
            <ul className="pill-list" role="list">
              {COPAF_2026.points.map((p) => <li key={p} className="chip">{p}</li>)}
            </ul>
            <ul className="copaf-pays" role="list" aria-label="Pays et autorités portuaires participants">
              {COPAF_2026.participants.map((p) => <li key={p.pays}><strong>{p.pays}</strong><span>{p.detail}</span></li>)}
            </ul>
            <p><strong>{COPAF_2026.bilan}.</strong> {COPAF_2027.annonce}</p>
            <div className="btn-row">
              <Link to="/copaf" className="btn btn--primary">Découvrir la COPAF <ArrowRight aria-hidden="true" /></Link>
              <a href={SITE.copafUrl} className="btn btn--outline" rel="noopener" target="_blank">copaf-ports.com<span className="sr-only"> (nouvel onglet)</span></a>
            </div>
          </div>
          <div className="mosaic">
            <div className="photo"><Picture name="copaf26-jour1-003" alt="Photo de groupe des participants de la COPAF 2026 à Casablanca" sizes="(max-width: 900px) 60vw, 30vw" position="50% 60%" /></div>
            <div className="photo"><Picture name="copaf26-jour3-immersion-244" alt="Visite de la maquette du port de Casablanca pendant la journée d'immersion" sizes="(max-width: 900px) 40vw, 20vw" /></div>
            <div className="photo"><Picture name="copaf26-jour1-087" alt="Intervention en séance plénière pendant la COPAF 2026" sizes="(max-width: 900px) 40vw, 20vw" /></div>
          </div>
        </div>
      </section>

      {/* 6. Mot du Directeur Général */}
      <section className="section section--light" aria-labelledby="edito-titre">
        <div className="container split split--reverse">
          <div className="photo portrait"><Picture name="pdf-img-007" alt={`${EDITORIAL.signature}, ${EDITORIAL.fonction}`} sizes="(max-width: 900px) 90vw, 30vw" position="50% 25%" /></div>
          <div className="quote">
            <span className="eyebrow">{EDITORIAL.surtitre}</span>
            <h2 id="edito-titre" className="h2">
              {EDITORIAL.titre[0]}<span className="accent">{EDITORIAL.titre[1]}</span>{EDITORIAL.titre[2]}
            </h2>
            <blockquote><p>{EDITORIAL.paragraphes[1].split('. ').slice(1).join('. ')}</p></blockquote>
            <div className="quote__sign"><strong>{EDITORIAL.signature}</strong><span>{EDITORIAL.fonction}</span></div>
            <Link to="/qui-sommes-nous#editorial" className="link-arrow">Lire l’éditorial <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* 7. Appel à l'action */}
      <section className="section section--dark on-dark" aria-labelledby="cta-titre">
        <div className="container cta">
          <span className="eyebrow">CRF Perfection</span>
          <h2 id="cta-titre" className="h2">Former. Conseiller. Faire <span className="accent">rayonner.</span></h2>
          <p className="lead">Un diagnostic préalable, puis un dispositif conçu avec vos équipes : parlons du projet de votre port.</p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn--white">Parlons de votre projet</Link>
            <Link to="/inscription" className="btn btn--primary">S’inscrire à une formation <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
