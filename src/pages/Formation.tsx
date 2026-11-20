import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, CalendarDays, Wallet } from 'lucide-react';
import { Seo } from '@/lib/head';
import { courseJsonLd } from '@/lib/jsonld';
import { useSelection } from '@/lib/selection';
import { FicheDetail, coutFormation, lieuFormation, periodeFormation, inscriptionHref } from '@/components/FormationCard';
import { parSlug, FAMILLES } from '@content/catalogue';
import { NotFound } from './NotFound';

export function FormationPage({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const f = parSlug(slugProp ?? params.slug ?? '');
  const sel = useSelection();
  if (!f) return <NotFound />;
  const fam = FAMILLES[f.famille];
  const infos = [
    { icon: Clock, t: 'Durée', v: f.duree },
    { icon: MapPin, t: 'Lieu', v: lieuFormation(f) },
    { icon: CalendarDays, t: 'Période', v: periodeFormation(f) },
    { icon: Wallet, t: 'Coût de participation', v: coutFormation(f) },
  ];
  return (
    <>
      <Seo
        path={`/formations/${f.slug}`}
        title={`${f.reference} · ${f.intitule}`}
        description={`${f.reference} : ${f.objectif ?? f.intitule} ${f.duree ?? ''}, ${lieuFormation(f)}, ${periodeFormation(f)}.`.slice(0, 300)}
        jsonLd={[courseJsonLd(f)]}
      />
      <section className="section section--light">
        <div className="container">
          <Link to={`/catalogue-2027#${fam.ancre}`} className="link-arrow"><ArrowLeft aria-hidden="true" /> {fam.nom}</Link>
          <div className="fiche-head">
            <div className="fiche-head__tag"><span className="code code--navy">{f.code}</span><span className="eyebrow">{fam.nom} · {f.cible}</span></div>
            <h1 id="fiche-t">{f.intitule}</h1>
            <ul className="pills pills--center" aria-label="Informations clés">
              {infos.map(({ icon: Icon, t, v }) => <li key={t}><Icon aria-hidden="true" /><span className="sr-only">{t} : </span>{v}</li>)}
              {f.hebergement && <li>Hébergement : {f.hebergement.toLowerCase()}</li>}
            </ul>
          </div>
          <div className="box box--narrow"><FicheDetail f={f} /></div>
          <div className="box--narrow" style={{ marginTop: 'var(--s-4)' }}>
          <div className="btn-row">
            {f.surDevis
              ? <Link to={`/contact?type=devis&code=${f.code}`} className="btn btn--primary">Demander un devis pour {f.code}</Link>
              : <Link to={inscriptionHref([f.code])} className="btn btn--primary">Demander cette formation</Link>}
            <button type="button" className="btn btn--outline" aria-pressed={sel.has(f.code)} onClick={() => sel.toggle(f.code)}>
              {sel.has(f.code) ? 'Retirer de ma sélection' : 'Ajouter à ma sélection'}
            </button>
            <Link to="/catalogue-2027" className="btn btn--outline">Tout le catalogue</Link>
          </div>
          </div>
          <p className="muted" style={{ textAlign: 'center', marginTop: 'var(--s-3)' }}>Réf. {f.reference}</p>
        </div>
      </section>
    </>
  );
}
