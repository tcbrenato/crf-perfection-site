import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Plus, Check, ArrowRight } from 'lucide-react';
import { formatSession, type Formation } from '@content/catalogue';

export const lieuFormation = (f: Formation) => f.lieu ?? '—';
export const periodeFormation = (f: Formation) => f.periode ?? (f.sessions[0] ? formatSession(f.sessions[0]) : '—');
export const coutFormation = (f: Formation) => f.cout ?? 'Sur demande';

export function inscriptionHref(codes: string[]) {
  return `/inscription?code=${codes.join(',')}`;
}

/** Carte du catalogue : visible tout de suite, la fiche complète se déplie sur place. */
export function FormationCard({ f, selected, onToggle }: { f: Formation; selected: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article className={`fcard${open ? ' is-open' : ''}`} id={f.code.toLowerCase()} aria-labelledby={`${id}-t`}>
      <div className="fcard__head">
        <span className="badge">{f.reference}</span>
        <span className="fcard__cible">{f.cible}</span>
      </div>
      <h3 className="fcard__title" id={`${id}-t`}>{f.intitule}</h3>
      <dl className="facts facts--4">
        <div><dt>Durée</dt><dd>{f.duree}</dd></div>
        <div><dt>Lieu</dt><dd>{lieuFormation(f)}</dd></div>
        <div><dt>Dates</dt><dd>{periodeFormation(f)}</dd></div>
        <div><dt>Coût</dt><dd>{coutFormation(f)}</dd></div>
      </dl>
      {f.objectif && <p className="fcard__obj"><strong>Objectif.</strong> {f.objectif}</p>}

      <button type="button" className="fcard__toggle" aria-expanded={open} aria-controls={`${id}-d`} onClick={() => setOpen(!open)}>
        {open ? 'Masquer la fiche' : 'Afficher la fiche complète'} <ChevronDown aria-hidden="true" />
      </button>

      <div id={`${id}-d`} className="fcard__detail" hidden={!open}>
        <FicheDetail f={f} />
      </div>

      <div className="fcard__actions">
        {f.surDevis
          ? <Link to={`/contact?type=devis&code=${f.code}`} className="btn btn--primary">Demander un devis</Link>
          : <Link to={inscriptionHref([f.code])} className="btn btn--primary">S’inscrire</Link>}
        <button type="button" className="btn btn--outline" aria-pressed={selected} onClick={onToggle}>
          {selected ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
          {selected ? 'Dans ma sélection' : 'Ajouter à ma sélection'}
        </button>
        <Link to={`/formations/${f.slug}`} className="link-arrow">Voir la fiche <span className="sr-only">{f.reference}</span><ArrowRight aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

/** Contenu complet d'une fiche (textes du Word). */
export function FicheDetail({ f }: { f: Formation }) {
  const blocs: [string, string | undefined | null][] = [
    ['Problématique & enjeux', f.problematique],
    ['Prolonge la COPAF 2026', f.prolonge],
    ['Ports concernés (projets publics)', f.portsConcernes],
    ['Compétences visées', f.competences],
    ['Différence avec T2', f.differenceT2],
    ['Précision', f.note],
  ];
  return (
    <div className="fiche">
      <div className="fiche__col">
        {blocs.filter(([, v]) => v).map(([t, v]) => (
          <section key={t}><h4 className="fiche__h">{t}</h4><p>{v}</p></section>
        ))}
        {f.contenu.length > 0 && (
          <section>
            <h4 className="fiche__h">Contenu</h4>
            <ul className="fiche__list">{f.contenu.map((c) => <li key={c}>{c}</li>)}</ul>
          </section>
        )}
      </div>
      <dl className="fiche__meta">
        {([['Format', f.format], ['Public', f.public], ['Prérequis', f.prerequis], ['Livrable', f.livrable], ['Hébergement', f.hebergement ?? (f.famille === 'C' ? 'Sur demande' : null)]] as const)
          .filter(([, v]) => v).map(([t, v]) => <div key={t}><dt>{t}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
}
