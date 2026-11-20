import { Link } from 'react-router-dom';
import { ArrowRight, Download, Globe2, LineChart, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/lib/head';
import { Picture } from '@/components/Picture';
import { SITE, RUBRIQUES, EN_BREF, EDITORIAL } from '@content/site';
import { COPAF_2026, COPAF_2027 } from '@content/copaf';
import { FORMATIONS, CHIFFRES } from '@content/catalogue';
import { organisationJsonLd } from '@/lib/jsonld';

const ICONES_BREF = [Globe2, LineChart, CheckCircle2];
const RECAP = FORMATIONS.filter((f) => f.famille === 'T' || f.famille === 'W');

export function Home() {
  return (
    <>
      <Seo
        path="/"
        title="CRF Perfection : formation et conseil pour les autorités portuaires africaines"
        description="Cabinet international de formation, de conseil stratégique et de recherche appliquée pour les ports africains : IA, cybersécurité, gouvernance, Smart Ports, décarbonation. Catalogue 2027 et COPAF."
        jsonLd={[organisationJsonLd()]}
      />

      {/* Couverture */}
      <section className="section section--dark on-dark cover" aria-labelledby="hero-titre">
        <div className="container cover__inner">
          <span className="eyebrow">{SITE.metiers}</span>
          <h1 id="hero-titre" className="cover__title">
            Formation et <span className="accent">conseil</span> pour les autorités portuaires
          </h1>
          <p className="cover__lead">Management portuaire, intelligence artificielle, cybersécurité & digitalisation : le catalogue 2027 et la COPAF, au service des ports africains.</p>
          <div className="btn-row">
            <Link to="/catalogue-2027" className="btn btn--primary">Découvrir le catalogue 2027 <ArrowRight aria-hidden="true" /></Link>
            <Link to="/contact" className="btn btn--white">Parlons de votre projet</Link>
          </div>
          <ul className="cover__themes" aria-label="Thèmes">{SITE.themes.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="cover__slogan">{SITE.slogan}</p>
        </div>
      </section>

      {/* En bref */}
      <section className="section section--light" aria-labelledby="bref-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Présentation</span>
            <h2 id="bref-t" className="h2">CRF Perfection en <span className="accent">bref</span></h2>
          </div>
          <div className="box box--narrow">
            <ul className="npanel-list">
              {EN_BREF.map((b, i) => {
                const Icon = ICONES_BREF[i];
                return (
                  <li key={b.titre} className="npanel">
                    <span className="npanel__icon"><Icon aria-hidden="true" /></span>
                    <div><h3 className="npanel__title">{b.titre}</h3><p className="npanel__text">{b.texte}</p></div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="wide-photo box--narrow" style={{ marginTop: 'var(--s-3)' }}>
            <Picture name="copaf26-jour3-immersion-097" alt="Le port de Casablanca, visité lors de la journée d'immersion de la COPAF 2026" sizes="(max-width: 960px) 100vw, 56rem" priority />
          </div>
        </div>
      </section>

      {/* Quatre rubriques */}
      <section className="section section--white" aria-labelledby="rub-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Structuration de nos activités</span>
            <h2 id="rub-t" className="h2">Quatre rubriques, un seul <span className="accent">positionnement</span></h2>
          </div>
          <ul className="npanel-list box--narrow">
            {RUBRIQUES.map((r) => (
              <li key={r.num}>
                <Link to={r.lien} className="npanel">
                  <span className="npanel__icon" aria-hidden="true">{r.num}</span>
                  <span><span className="npanel__title">{r.titre}</span><span className="npanel__text" style={{ display: 'block' }}>{r.resume}</span></span>
                  <ArrowRight aria-hidden="true" style={{ width: 20, height: 20 }} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vue d'ensemble du catalogue */}
      <section className="section section--light" aria-labelledby="cat-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Catalogue à la carte · Vue d’ensemble</span>
            <h2 id="cat-t" className="h2">Cinq formations pour cinq <span className="accent">cibles</span></h2>
            <p className="lead">{CHIFFRES.formations} formations au total, dont la série COPAF (C1 à C9) et les programmes sur mesure (B1 à B6).</p>
          </div>
          <div className="table-wrap box--narrow">
            <table className="table table--stack">
              <thead><tr><th scope="col">Code</th><th scope="col">Intitulé</th><th scope="col">Durée</th><th scope="col">Lieu et dates</th><th scope="col">Coût</th></tr></thead>
              <tbody>
                <tr className="t-group"><td colSpan={5}>Catalogue à la carte · une formation par profil décisionnel</td></tr>
                {RECAP.filter((f) => f.famille === 'T').map((f) => <Ligne key={f.code} f={f} />)}
                <tr className="t-group"><td colSpan={5}>Webinaires · deux modules d’une journée</td></tr>
                {RECAP.filter((f) => f.famille === 'W').map((f) => <Ligne key={f.code} f={f} />)}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ textAlign: 'center', marginTop: 'var(--s-2)' }}>Coûts par participant, hébergement non inclus.</p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--s-4)' }}>
            <Link to="/catalogue-2027" className="btn btn--primary">Voir tout le catalogue <ArrowRight aria-hidden="true" /></Link>
            <a href="/catalogue/CRF_Perfection_Catalogue_Formation_2027.pdf" className="btn btn--outline" download><Download aria-hidden="true" /> Télécharger le PDF</a>
          </div>
        </div>
      </section>

      {/* COPAF */}
      <section className="section section--dark on-dark" aria-labelledby="copaf-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{COPAF_2026.surtitre}</span>
            <h2 id="copaf-t" className="h2">{COPAF_2026.titre[0]}<span className="accent">{COPAF_2026.titre[1]}</span>{COPAF_2026.titre[2]}</h2>
            <ul className="pill-list" style={{ justifyContent: 'center' }} role="list">{COPAF_2026.points.map((p) => <li key={p} className="chip">{p}</li>)}</ul>
          </div>
          <div className="wide-photo box--narrow">
            <Picture name="copaf26-jour3-immersion-142" alt="Les participants de la COPAF 2026 sur la terrasse surplombant le port de Casablanca" sizes="(max-width: 960px) 100vw, 56rem" />
          </div>
          <ul className="countries box--narrow" style={{ marginTop: 'var(--s-3)' }} aria-label="Pays et autorités portuaires participants">
            {COPAF_2026.participants.map((p) => <li key={p.pays}><strong>{p.pays}</strong><span>{p.detail}</span></li>)}
          </ul>
          <div className="cta" style={{ marginTop: 'var(--s-4)' }}>
            <span className="pill-solid">{COPAF_2026.bilan}</span>
            <p className="lead">{COPAF_2027.annonce}</p>
            <div className="btn-row">
              <Link to="/copaf" className="btn btn--white">Découvrir la COPAF</Link>
              <a href={SITE.copafUrl} className="btn btn--outline" rel="noopener" target="_blank">copaf-ports.com<span className="sr-only"> (nouvel onglet)</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* Éditorial, sans photo */}
      <section className="section section--light" aria-labelledby="edito-t">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{EDITORIAL.surtitre}</span>
            <h2 id="edito-t" className="h2">{EDITORIAL.titre[0]}<span className="accent">{EDITORIAL.titre[1]}</span>{EDITORIAL.titre[2]}</h2>
          </div>
          <div className="box box--narrow">
            <div className="edito">
              <blockquote><p>{EDITORIAL.paragraphes[1].split('. ').slice(1).join('. ')}</p></blockquote>
              <div className="quote__sign"><strong>{EDITORIAL.signature}</strong><span>{EDITORIAL.fonction}</span></div>
              <Link to="/qui-sommes-nous#editorial" className="link-arrow">Lire l’éditorial <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="section section--dark on-dark" aria-labelledby="cta-t">
        <div className="container cta">
          <h2 id="cta-t" className="h2">Former. Conseiller. Faire <span className="accent">rayonner.</span></h2>
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

function Ligne({ f }: { f: (typeof FORMATIONS)[number] }) {
  return (
    <tr>
      <td><Link to={`/formations/${f.slug}`} className="code code--navy" aria-label={`Fiche ${f.reference}`}>{f.code}</Link></td>
      <td><Link to={`/formations/${f.slug}`} className="t-title" style={{ textDecoration: 'none' }}>{f.intitule}</Link><span className="t-sub">{f.cible}</span></td>
      <td>{f.duree}</td>
      <td><span className="t-title">{f.lieu}</span><span className="t-sub">{f.periode}</span></td>
      <td><strong>{f.cout ?? 'Sur demande'}</strong></td>
    </tr>
  );
}
