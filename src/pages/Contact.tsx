import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, Globe, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/lib/head';
import { rpc } from '@/lib/api';
import { SITE } from '@content/site';
import { FORMATIONS } from '@content/catalogue';

export function Contact() {
  const [params] = useSearchParams();
  const [type, setType] = useState(params.get('type') === 'devis' ? 'devis' : 'contact');
  const [codes, setCodes] = useState<string[]>((params.get('code') ?? '').split(',').map((c) => c.toUpperCase()).filter((c) => FORMATIONS.some((f) => f.code === c)));
  const [f, setF] = useState({ nom: '', fonction: '', organisation: '', pays: '', email: '', telephone: '', message: '', consentement: false, site_web: '' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((x) => ({ ...x, [k]: v }));

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!f.nom.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !f.message.trim()) return setErr('Merci de renseigner votre nom, un e-mail valide et votre message.');
    if (!f.consentement) return setErr('Merci d’accepter la politique de confidentialité.');
    setErr(''); setSending(true);
    try { await rpc('submit_contact', { ...f, type, codes, langue: 'fr' }); setOk(true); }
    catch (x) { setErr((x as Error).message); } finally { setSending(false); }
  };

  return (
    <>
      <Seo path="/contact" title="Contact et demande de devis" description="Contactez CRF Perfection : formation, diagnostic et conseil stratégique pour les autorités portuaires africaines. +229 01 69 30 30 19 · contact@crfperfection.pro." />
      <section className="section section--dark on-dark page-hero" aria-labelledby="ct-t">
        <div className="container hero__copy">
          <span className="eyebrow">Contact</span>
          <h1 id="ct-t" className="h1">Parlons de votre <span className="accent">projet</span></h1>
          <p className="hero__lead">Une question sur le catalogue 2027, un programme sur mesure ou un diagnostic : notre équipe vous répond.</p>
        </div>
      </section>
      <section className="section section--light">
        <div className="container contact-grid">
          <aside className="contact-aside">
            <h2 className="h3">Nos coordonnées</h2>
            <ul className="contact-list" role="list">
              {SITE.contact.telephones.map((t) => <li key={t.tel}><Phone aria-hidden="true" /><span><span className="muted">{t.libelle}</span><a href={`tel:${t.tel}`}>{t.affiche}</a></span></li>)}
              <li><Mail aria-hidden="true" /><span><span className="muted">E-mail</span><a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a></span></li>
              <li><Mail aria-hidden="true" /><span><span className="muted">COPAF</span><a href={`mailto:${SITE.contact.emailCopaf}`}>{SITE.contact.emailCopaf}</a></span></li>
              <li><Globe aria-hidden="true" /><span><span className="muted">Site</span><a href={SITE.url}>{SITE.domaine}</a></span></li>
            </ul>
            <p className="muted">Siège : {SITE.implantation.siege}. Agences : {SITE.implantation.agences.join(', ')}.</p>
            <p className="muted">Pour inscrire des participants à une formation datée, utilisez le <Link to="/inscription">formulaire d’inscription</Link>.</p>
          </aside>

          {ok ? (
            <div className="card confirm" role="status">
              <CheckCircle2 aria-hidden="true" className="confirm__icon" />
              <h2 className="h2">Message bien reçu</h2>
              <p>Merci. L’équipe CRF Perfection revient vers vous à l’adresse {f.email}.</p>
              <Link to="/catalogue-2027" className="btn btn--primary">Voir le catalogue 2027</Link>
            </div>
          ) : (
            <form className="card form" onSubmit={submit} noValidate>
              <fieldset className="seg seg--form"><legend className="sr-only">Objet</legend>
                <label><input type="radio" name="type" checked={type === 'contact'} onChange={() => setType('contact')} /> Question</label>
                <label><input type="radio" name="type" checked={type === 'devis'} onChange={() => setType('devis')} /> Demande de devis</label>
              </fieldset>
              <label className="hp" aria-hidden="true">Site web <input tabIndex={-1} autoComplete="off" value={f.site_web} onChange={(x) => set('site_web', x.target.value)} /></label>
              <div className="form-grid">
                {([['nom', 'Nom *', 'name', 'text'], ['fonction', 'Fonction', 'organization-title', 'text'], ['organisation', 'Organisation', 'organization', 'text'], ['pays', 'Pays', 'country-name', 'text'], ['email', 'E-mail *', 'email', 'email'], ['telephone', 'Téléphone', 'tel', 'tel']] as const).map(([k, l, ac, t]) => (
                  <label key={k} className="field field--block"><span>{l}</span><input type={t} autoComplete={ac} value={f[k]} onChange={(x) => set(k, x.target.value)} required={l.endsWith('*')} /></label>
                ))}
                <fieldset className="pick pick--inline field--wide"><legend>Code(s) de formation concerné(s)</legend>
                  {FORMATIONS.map((x) => (
                    <label key={x.code} className="check"><input type="checkbox" checked={codes.includes(x.code)} onChange={() => setCodes(codes.includes(x.code) ? codes.filter((c) => c !== x.code) : [...codes, x.code])} /> {x.code}</label>
                  ))}
                </fieldset>
                <label className="field field--block field--wide"><span>Message *</span><textarea rows={6} value={f.message} onChange={(x) => set('message', x.target.value)} required /></label>
              </div>
              <label className="check"><input type="checkbox" checked={f.consentement} onChange={(x) => set('consentement', x.target.checked)} /> J’accepte que mes données soient utilisées pour répondre à ma demande (<Link to="/confidentialite">politique de confidentialité</Link>). *</label>
              {err && <p className="error" role="alert">{err}</p>}
              <div className="form__nav"><button className="btn btn--primary" type="submit" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer'}</button></div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
