import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV } from '@/lib/nav';
import { SITE } from '@content/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(false); setSub(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setSub(null); } };
    const onClick = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setSub(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label={`${SITE.nom}, accueil`}>
          <img src="/logos/crf-perfection-couleur.png" alt={SITE.nomLong} width="560" height="93" />
        </Link>

        <nav ref={navRef} className={`site-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale" id="menu-principal">
          <ul className="site-nav__list">
            {NAV.map((item) =>
              'children' in item ? (
                <li key={item.to} className="site-nav__item has-sub">
                  <button
                    type="button"
                    className={`site-nav__link${pathname.startsWith('/nos-activites') || pathname === '/formations-sur-mesure' ? ' is-active' : ''}`}
                    aria-expanded={sub === item.to}
                    aria-controls="sous-menu-activites"
                    onClick={() => setSub(sub === item.to ? null : item.to)}
                  >
                    {item.label} <ChevronDown aria-hidden="true" />
                  </button>
                  <ul id="sous-menu-activites" className="site-nav__sub" hidden={sub !== item.to}>
                    {item.children.map((c) => (
                      <li key={c.to}><NavLink end to={c.to} className="site-nav__sublink">{c.label}</NavLink></li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="site-nav__item">
                  <NavLink to={item.to} className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="site-nav__extra">
            <div className="lang" role="group" aria-label="Langue">
              <span className="lang__current" aria-current="true">FR</span>
              <span aria-hidden="true" className="lang__sep">|</span>
              <span className="lang__soon" title="Version anglaise en préparation">EN</span>
            </div>
            <Link to="/contact" className="btn btn--primary site-header__cta">Parlons de votre projet</Link>
          </div>
        </nav>

        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
        </button>
      </div>
    </header>
  );
}
