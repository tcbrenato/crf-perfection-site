import { Link } from 'react-router-dom';
import { Seo } from '@/lib/head';

export function NotFound() {
  return (
    <section className="section section--dark on-dark" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <Seo path="/404" title="Page introuvable" description="La page demandée n’existe pas ou a été déplacée." noindex />
      <div className="container cta">
        <span className="eyebrow">Erreur 404</span>
        <h1 className="h1">Cette page est <span className="accent">introuvable</span></h1>
        <p className="lead">Elle a peut-être été déplacée lors de la refonte du site. Les liens ci-dessous vous ramènent à l’essentiel.</p>
        <div className="btn-row">
          <Link to="/" className="btn btn--white">Accueil</Link>
          <Link to="/catalogue-2027" className="btn btn--primary">Catalogue 2027</Link>
          <Link to="/contact" className="btn btn--outline">Contact</Link>
        </div>
      </div>
    </section>
  );
}
