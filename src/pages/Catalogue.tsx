import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, Search, X, CalendarDays, List, ArrowRight } from 'lucide-react';
import { Seo } from '@/lib/head';
import { useSelection } from '@/lib/selection';
import { FormationCard, inscriptionHref } from '@/components/FormationCard';
import {
  FORMATIONS, FAMILLES, PROFILS, FORMATS, CHIFFRES, LIEUX, SESSIONS, formatSession,
  type Famille, type Formation, type Profil, type Format,
} from '@content/catalogue';
import { ENJEUX_2027, PROJETS_PUBLICS, DEMARCHE, PARTIE3, CALENDRIER_RAISONS } from '@content/catalogue/contexte';

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const PDF = '/catalogue/CRF_Perfection_Catalogue_Formation_2027.pdf';
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function filtrer(list: Formation[], p: URLSearchParams) {
  const q = norm(p.get('q') ?? '');
  const profil = p.get('profil') as Profil | null;
  const lieu = p.get('lieu');
  const mois = p.get('mois');
  const duree = p.get('duree');
  const format = p.get('format') as Format | null;
  return list.filter((f) => {
    if (q && !norm([f.code, f.reference, f.intitule, f.cible, f.objectif ?? '', f.public ?? '', f.contenu.join(' ')].join(' ')).includes(q)) return false;
    if (profil && !f.profils.includes(profil)) return false;
    if (lieu && !f.sessions.some((s) => s.ville === lieu)) return false;
    if (mois && !f.sessions.some((s) => Number(s.debut.slice(5, 7)) === Number(mois) || Number(s.fin.slice(5, 7)) === Number(mois))) return false;
    if (duree && f.jours !== Number(duree)) return false;
    if (format && f.formatType !== format) return false;
    return true;
  });
}

export function Catalogue() {
  const [params, setParams] = useSearchParams();
  const sel = useSelection();
  const vue = params.get('vue') === 'calendrier' ? 'calendrier' : 'liste';
  const resultats = useMemo(() => filtrer(FORMATIONS, params), [params]);
  const actifs = ['q', 'profil', 'lieu', 'mois', 'duree', 'format'].filter((k) => params.get(k));

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const reset = () => setParams(vue === 'calendrier' ? { vue } : {}, { replace: true, preventScrollReset: true });
  const moisDispos = [...new Set(SESSIONS.flatMap((x) => [Number(x.session.debut.slice(5, 7))]))].sort((a, b) => a - b);
  const durees = [...new Set(FORMATIONS.map((f) => f.jours))].sort();

  return (
    <>
      <Seo
        path="/catalogue-2027"
        title="Catalogue de formation 2027 : management portuaire, IA, cybersécurité"
        description={`Les ${CHIFFRES.formations} formations 2027 de CRF Perfection pour les autorités portuaires africaines : catalogue à la carte, webinaires, série COPAF et programmes sur mesure. Dates, lieux, coûts, inscription.`}
      />

      <section className="section section--dark on-dark cat-hero" aria-labelledby="cat-titre">
        <div className="container cat-hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Formation · Conseil stratégique · Recherche appliquée</span>
            <h1 id="cat-titre" className="h1">Catalogue de formation <span className="accent">2027</span></h1>
            <p className="hero__lead">Management portuaire, intelligence artificielle, cybersécurité & digitalisation</p>
            <div className="btn-row">
              <Link to="/inscription" className="btn btn--white">S’inscrire</Link>
              <a href={PDF} download className="btn btn--outline"><Download aria-hidden="true" /> Télécharger le PDF</a>
            </div>
          </div>
          <dl className="kpis">
            <div><dt>Formations</dt><dd>{CHIFFRES.formations}</dd></div>
            <div><dt>Villes</dt><dd>{CHIFFRES.lieux}</dd></div>
            <div><dt>Familles</dt><dd>{CHIFFRES.familles}</dd></div>
          </dl>
        </div>
      </section>

      <div className="catbar" role="search" aria-label="Rechercher et filtrer le catalogue">
        <div className="container catbar__inner">
          <nav className="catbar__anchors" aria-label="Familles de formations">
            {(Object.keys(FAMILLES) as Famille[]).map((k) => <a key={k} href={`#${FAMILLES[k].ancre}`}>{FAMILLES[k].court}</a>)}
            <a href="#calendrier">Calendrier</a>
          </nav>
          <div className="catbar__filters">
            <label className="field field--search">
              <span className="sr-only">Rechercher par code ou mot-clé</span>
              <Search aria-hidden="true" />
              <input type="search" placeholder="Code (T2, C6…) ou mot-clé" value={params.get('q') ?? ''} onChange={(e) => set('q', e.target.value)} />
            </label>
            <Select label="Profil" value={params.get('profil')} onChange={(v) => set('profil', v)} options={Object.entries(PROFILS)} />
            <Select label="Lieu" value={params.get('lieu')} onChange={(v) => set('lieu', v)} options={LIEUX.map((l) => [l, l])} />
            <Select label="Mois" value={params.get('mois')} onChange={(v) => set('mois', v)} options={moisDispos.map((m) => [String(m), MOIS[m - 1]])} />
            <Select label="Durée" value={params.get('duree')} onChange={(v) => set('duree', v)} options={durees.map((d) => [String(d), `${d} jour${d > 1 ? 's' : ''}`])} />
            <Select label="Format" value={params.get('format')} onChange={(v) => set('format', v)} options={Object.entries(FORMATS)} />
          </div>
          <div className="catbar__status">
            <p aria-live="polite"><strong>{resultats.length}</strong> formation{resultats.length > 1 ? 's' : ''} sur {FORMATIONS.length}</p>
            {actifs.length > 0 && <button type="button" className="btn-text" onClick={reset}><X aria-hidden="true" /> Réinitialiser</button>}
            <div className="seg" role="group" aria-label="Affichage">
              <button type="button" aria-pressed={vue === 'liste'} onClick={() => set('vue', '')}><List aria-hidden="true" /> Liste</button>
              <button type="button" aria-pressed={vue === 'calendrier'} onClick={() => set('vue', 'calendrier')}><CalendarDays aria-hidden="true" /> Calendrier</button>
            </div>
          </div>
        </div>
      </div>

      {sel.codes.length > 0 && (
        <aside className="selection" aria-label="Ma sélection">
          <div className="container selection__inner">
            <p><strong>Ma sélection</strong> : {sel.codes.join(', ')}</p>
            <div className="btn-row">
              <Link to={inscriptionHref(sel.codes.filter((c) => !c.startsWith('B')))} className="btn btn--primary">S’inscrire à la sélection</Link>
              <button type="button" className="btn btn--outline" onClick={sel.clear}>Vider</button>
            </div>
          </div>
        </aside>
      )}

      {vue === 'calendrier' ? <Calendrier list={resultats} /> : (
        <>
          <section className="section section--light" aria-labelledby="enjeux-titre">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Contexte</span>
                <h2 id="enjeux-titre" className="h2">Enjeux 2027 pour les <span className="accent">ports africains</span></h2>
              </div>
              <ul className="npanel-list box box--narrow" role="list">
                {ENJEUX_2027.map((e, i) => (
                  <li key={e.titre} className="npanel">
                    <span className="npanel__icon" aria-hidden="true">{i + 1}</span>
                    <div><h3 className="npanel__title">{e.titre}</h3><p className="npanel__text">{e.texte}</p></div>
                    <p className="npanel__aside">{e.codes.map((c) => <a key={c} href={`#${c.toLowerCase()}`} className="code">{c}</a>)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {(Object.keys(FAMILLES) as Famille[]).map((k, i) => {
            const fam = FAMILLES[k];
            const items = resultats.filter((f) => f.famille === k);
            return (
              <section key={k} id={fam.ancre} className={`section ${i % 2 ? 'section--light' : 'section--white'}`} aria-labelledby={`${fam.ancre}-t`}>
                <div className="container">
                  <div className="section-head">
                    <span className="eyebrow">{fam.court}</span>
                    <h2 id={`${fam.ancre}-t`} className="h2">{fam.nom}</h2>
                    <p className="lead">{fam.intro} {fam.detail}</p>
                    {k === 'B' && <p className="lead">{PARTIE3.difference} {PARTIE3.livraison}</p>}
                  </div>
                  {items.length === 0
                    ? <p className="empty">Aucune formation de cette famille ne correspond aux filtres.</p>
                    : <div className="fgrid">{items.map((f) => <FormationCard key={f.code} f={f} selected={sel.has(f.code)} onToggle={() => sel.toggle(f.code)} />)}</div>}

                  {k === 'B' && (
                    <div className="sur-mesure">
                      <h3 className="h3">Projets publics et programmes recommandés</h3>
                      <div className="table-wrap">
                        <table className="table">
                          <thead><tr><th scope="col">Projet public cité</th><th scope="col">Pays</th><th scope="col">Programmes</th></tr></thead>
                          <tbody>{PROJETS_PUBLICS.map((p) => (
                            <tr key={p.projet}><td>{p.projet}</td><td>{p.pays}</td><td><span className="pills">{p.codes.map((c) => <span key={c} className="code code--navy">{c}</span>)}</span></td></tr>
                          ))}</tbody>
                        </table>
                      </div>
                      <h3 className="h3">Comment nous construisons un programme pour un port</h3>
                      <ol className="npanel-list" style={{ width: '100%' }}>{DEMARCHE.map((d, n) => <li key={d.titre} className="npanel"><span className="npanel__icon" aria-hidden="true">{n + 1}</span><div><strong className="npanel__title">{d.titre}</strong><p className="npanel__text">{d.texte}</p></div></li>)}</ol>
                      <Link to="/contact?type=devis" className="btn btn--primary">Demander un devis <ArrowRight aria-hidden="true" /></Link>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
          <Calendrier list={resultats} />
        </>
      )}
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string | null; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="field">
      <span className="sr-only">{label}</span>
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label} : tous</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function Calendrier({ list }: { list: Formation[] }) {
  const codes = new Set(list.map((f) => f.code));
  const sessions = SESSIONS.filter((x) => codes.has(x.formation.code));
  const parMois = new Map<number, typeof sessions>();
  for (const s of sessions) {
    const m = Number(s.session.debut.slice(5, 7));
    parMois.set(m, [...(parMois.get(m) ?? []), s]);
  }
  const chevauche = (a: (typeof sessions)[number]) =>
    sessions.some((b) => b !== a && b.session.debut <= a.session.fin && a.session.debut <= b.session.fin && !a.session.moisSeulement && !b.session.moisSeulement);

  return (
    <section id="calendrier" className="section section--white" aria-labelledby="cal-t">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Calendrier prévisionnel</span>
          <h2 id="cal-t" className="h2">Les sessions <span className="accent">2027</span>, mois par mois</h2>
          <p className="lead">Les sessions qui se tiennent en même temps sont signalées « en parallèle ». Les programmes sur mesure (B) sont planifiés après le diagnostic préalable.</p>
        </div>
        {sessions.length === 0 && <p className="empty">Aucune session datée ne correspond aux filtres.</p>}
        <ol className="cal" role="list">
          {[...parMois.entries()].sort(([a], [b]) => a - b).map(([m, items]) => (
            <li key={m} className="cal__month">
              <h3 className="cal__title">{MOIS[m - 1]} 2027</h3>
              <ul role="list" className="cal__list">
                {items.map((x) => (
                  <li key={x.formation.code}>
                    <a href={`/formations/${x.formation.slug}`} className="cal__item">
                      <span className="badge">{x.formation.code}</span>
                      <span className="cal__body">
                        <span className="cal__date">{formatSession(x.session)} · {x.session.ville}</span>
                        <span className="cal__name">{x.formation.intitule}</span>
                        {chevauche(x) && <span className="tag">En parallèle</span>}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <details className="cal__why">
          <summary>Pourquoi ces dates et ces lieux ?</summary>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th scope="col">Période</th><th scope="col">Lieu</th><th scope="col">Sessions</th><th scope="col">Pourquoi ce choix</th></tr></thead>
              <tbody>{CALENDRIER_RAISONS.map((r) => <tr key={r.periode}><td>{r.periode}</td><td>{r.lieu}</td><td>{r.sessions}</td><td>{r.raison}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}
