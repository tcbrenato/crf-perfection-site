import { useId, useState } from 'react';
import { Clock, MapPin, CalendarDays, Wallet } from 'lucide-react';
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
      <ul className="pills" aria-label="Informations clés">
        <li><Clock aria-hidden="true" />{f.duree}</li>
        <li><MapPin aria-hidden="true" />{lieuFormation(f)}</li>
        <li><CalendarDays aria-hidden="true" />{periodeFormation(f)}</li>
        <li><Wallet aria-hidden="true" />{coutFormation(f)}</li>
      </ul>
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

/** Contenu complet d'une fiche (textes du Word), présenté en panneaux bleu nuit comme le catalogue PDF. */
export function FicheDetail({ f }: { f: Formation }) {
  const blocs: [string, React.ReactNode | undefined | null][] = [
    ['Objectif', f.objectif],
    ['Problématique & enjeux', f.problematique],
    ['Prolonge la COPAF 2026', f.prolonge],
    ['Ports concernés (projets publics)', f.portsConcernes],
    ['Compétences visées', f.competences],
    ['Différence avec T2', f.differenceT2],
    ['Précision', f.note],
    ['Contenu', f.contenu.length ? <ul>{f.contenu.map((c) => <li key={c}>{c}</li>)}</ul> : null],
    ['Livrable', f.livrable],
  ];
  const meta = ([['Format', f.format], ['Public', f.public], ['Prérequis', f.prerequis], ['Hébergement', f.hebergement ?? (f.famille === 'C' ? 'Sur demande' : null)]] as const).filter(([, v]) => v);
  return (
    <ul className="npanel-list">
      {blocs.filter(([, v]) => v).map(([t, v], i) => (
        <li key={t} className="npanel">
          <span className="npanel__icon" aria-hidden="true">{i + 1}</span>
          <div><h4 className="npanel__title">{t}</h4><div className="npanel__text">{v}</div></div>
        </li>
      ))}
      <li className="npanel npanel--meta">
        <span className="npanel__icon" aria-hidden="true">i</span>
        <dl className="meta-grid">{meta.map(([t, v]) => <div key={t}><dt>{t}</dt><dd>{v}</dd></div>)}</dl>
      </li>
    </ul>
  );
}
