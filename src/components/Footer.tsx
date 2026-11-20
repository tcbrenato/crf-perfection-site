import { Link } from 'react-router-dom';
import { Mail, Phone, Globe } from 'lucide-react';
import { SITE } from '@content/site';
import { NAV } from '@/lib/nav';

export function Footer() {
  const annee = new Date().getFullYear();
  return (
    <footer className="site-footer section--dark on-dark">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/logos/crf-perfection-blanc.png" alt={SITE.nomLong} width="574" height="87" loading="lazy" />
          <p className="site-footer__slogan">{SITE.slogan}</p>
          <p className="site-footer__text">{SITE.metiers}</p>
        </div>

        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__list">
            {SITE.contact.telephones.map((t) => (
              <li key={t.tel}><Phone aria-hidden="true" /><a href={`tel:${t.tel}`}>{t.affiche}</a></li>
            ))}
            <li><Mail aria-hidden="true" /><a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a></li>
            <li><Globe aria-hidden="true" /><a href={SITE.url}>{SITE.domaine}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Plan du site</h2>
          <ul className="site-footer__links">
            <li><Link to="/">Accueil</Link></li>
            {NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            <li><Link to="/formations-sur-mesure">Formations sur mesure</Link></li>
            <li><Link to="/inscription">Inscription</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Implantation</h2>
          <p className="site-footer__text">
            Siège : {SITE.implantation.siege}.<br />Agences : {SITE.implantation.agences.join(', ')}.
          </p>
          {SITE.reseaux.length > 0 && (
            <ul className="site-footer__links">
              {SITE.reseaux.map((r) => <li key={r.url}><a href={r.url} rel="noopener">{r.nom}</a></li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {annee} {SITE.nom}. Tous droits réservés.</p>
        <ul className="site-footer__legal">
          <li><Link to="/mentions-legales">Mentions légales</Link></li>
          <li><Link to="/confidentialite">Confidentialité</Link></li>
        </ul>
      </div>
    </footer>
  );
}
