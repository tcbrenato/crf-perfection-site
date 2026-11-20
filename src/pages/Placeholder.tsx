import { Link } from 'react-router-dom';
import { Seo } from '@/lib/head';

/** Page provisoire pour les routes construites aux étapes 2 et 3 (non indexée). */
export function Placeholder({ title, path, etape }: { title: string; path: string; etape: 2 | 3 }) {
  return (
    <section className="section section--light">
      <Seo path={path} title={title} description={`${title} : page en préparation.`} noindex />
      <div className="container section-head">
        <span className="eyebrow">En préparation · étape {etape}</span>
        <h1 className="h2">{title}</h1>
        <p className="lead">Cette page sera livrée à l’étape {etape} du chantier, après validation de la page d’accueil.</p>
        <Link to="/" className="btn btn--primary">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
