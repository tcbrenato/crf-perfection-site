import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Plus, Trash2, Printer } from 'lucide-react';
import { Seo } from '@/lib/head';
import { rpc } from '@/lib/api';
import { FORMATIONS, FAMILLES, formatSession, formatEuros, parCode, type Famille, type Formation } from '@content/catalogue';
import { SITE } from '@content/site';

type TypeDemande = 'catalogue' | 'sur_mesure' | 'copaf' | 'autre';
interface Participant { civilite: string; nom: string; prenom: string; fonction: string; email: string; telephone: string; nationalite: string; besoins_particuliers: string; codes: string[] }
interface Etat {
  type: TypeDemande | '';
  codes: string[];
  dg: Record<string, boolean>;
  participants: Participant[];
  org: { organisation: string; type_organisation: string; pays: string; adresse_facturation: string; referent_facturation: string; bon_commande: string; contact_nom: string; contact_email: string; contact_telephone: string };
  besoins: string; delais: string;
  consentement: boolean; conditions: boolean; site_web: string;
}

const BROUILLON = 'crf-inscription-brouillon';
const vide = (): Participant => ({ civilite: '', nom: '', prenom: '', fonction: '', email: '', telephone: '', nationalite: '', besoins_particuliers: '', codes: [] });
const initial: Etat = {
  type: '', codes: [], dg: {}, participants: [vide()],
  org: { organisation: '', type_organisation: '', pays: '', adresse_facturation: '', referent_facturation: '', bon_commande: '', contact_nom: '', contact_email: '', contact_telephone: '' },
  besoins: '', delais: '', consentement: false, conditions: false, site_web: '',
};
const TYPES: { k: TypeDemande; t: string; d: string }[] = [
  { k: 'catalogue', t: 'Formation du catalogue', d: 'Catalogue à la carte (T), webinaires (W) ou série COPAF (C).' },
  { k: 'sur_mesure', t: 'Programme sur mesure', d: 'Séries par projet de port (B1 à B6), sur devis après diagnostic.' },
  { k: 'copaf', t: 'COPAF 2027', d: 'Pré-inscription et manifestation d’intérêt pour la 2ᵉ édition.' },
  { k: 'autre', t: 'Autre demande', d: 'Formation non listée ou besoin spécifique.' },
];
const ETAPES = ['Type de demande', 'Formations', 'Participants', 'Organisation', 'Récapitulatif'];
const INSCRIPTIBLES = FORMATIONS.filter((f) => !f.surDevis);

const tarifDe = (f: Formation, dg: boolean) => (f.tarifs.length ? (dg && f.tarifs.length > 1 ? f.tarifs[0].montant : f.tarifs.at(-1)!.montant) : null);

/** Chevauchements : mêmes dates (sessions qui se recoupent). */
function conflits(codes: string[]) {
  const fs = codes.map(parCode).filter(Boolean) as Formation[];
  const out: string[] = [];
  for (let i = 0; i < fs.length; i++) for (let j = i + 1; j < fs.length; j++) {
    const a = fs[i].sessions[0], b = fs[j].sessions[0];
    if (a && b && !a.moisSeulement && !b.moisSeulement && a.debut <= b.fin && b.debut <= a.fin)
      out.push(`${fs[i].code} (${formatSession(a)}, ${a.ville}) et ${fs[j].code} (${formatSession(b)}, ${b.ville}) se tiennent aux mêmes dates.`);
  }
  return out;
}

export function Inscription() {
  const [params] = useSearchParams();
  const [e, setE] = useState<Etat>(initial);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState('');
  const [err, setErr] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  // Brouillon local + préremplissage par ?code=
  useEffect(() => {
    let base = initial;
    try { const b = localStorage.getItem(BROUILLON); if (b) base = { ...initial, ...JSON.parse(b) }; } catch { /* ignore */ }
    const pre = (params.get('code') ?? '').split(',').map((c) => c.trim().toUpperCase()).filter((c) => parCode(c) && !parCode(c)!.surDevis);
    if (pre.length) { base = { ...base, type: 'catalogue', codes: [...new Set([...base.codes, ...pre])] }; setStep(1); }
    setE(base);
  }, [params]);
  useEffect(() => { try { localStorage.setItem(BROUILLON, JSON.stringify({ ...e, site_web: '' })); } catch { /* ignore */ } }, [e]);

  const devis = e.type === 'sur_mesure' || e.type === 'autre';
  const etapes = devis || e.type === 'copaf' ? [0, 3, 4] : [0, 1, 2, 3, 4];
  const pos = etapes.indexOf(step);
  const choisies = e.codes.map(parCode).filter(Boolean) as Formation[];
  const nbPart = Math.max(1, e.participants.length);
  const lignes = choisies.map((f) => {
    const nb = e.participants.filter((p) => p.codes.includes(f.code)).length || nbPart;
    const t = tarifDe(f, !!e.dg[f.code]);
    return { f, nb, t, total: t != null ? t * nb : null };
  });
  const total = lignes.reduce((s, l) => s + (l.total ?? 0), 0);
  const alertes = useMemo(() => conflits(e.codes), [e.codes]);

  const upd = (patch: Partial<Etat>) => setE((x) => ({ ...x, ...patch }));
  const updOrg = (k: keyof Etat['org'], v: string) => setE((x) => ({ ...x, org: { ...x.org, [k]: v } }));
  const updPart = (i: number, patch: Partial<Participant>) => setE((x) => ({ ...x, participants: x.participants.map((p, n) => (n === i ? { ...p, ...patch } : p)) }));

  const valide = (): string => {
    if (step === 0 && !e.type) return 'Choisissez un type de demande.';
    if (step === 1 && e.codes.length === 0) return 'Sélectionnez au moins une formation.';
    if (step === 2 && e.participants.some((p) => !p.nom.trim() || !p.prenom.trim() || !/^\S+@\S+\.\S+$/.test(p.email))) return 'Chaque participant doit avoir un nom, un prénom et un e-mail valide.';
    if (step === 3 && (!e.org.organisation.trim() || !e.org.contact_nom.trim() || !/^\S+@\S+\.\S+$/.test(e.org.contact_email))) return 'Renseignez l’organisation, le nom et l’e-mail du contact.';
    if (step === 3 && devis && !e.besoins.trim()) return 'Décrivez votre projet et vos besoins.';
    if (step === 4 && (!e.consentement || !e.conditions)) return 'Merci de cocher les deux cases d’acceptation.';
    return '';
  };
  const suivant = () => { const m = valide(); setErr(m); if (!m) { setStep(etapes[pos + 1]); window.scrollTo({ top: 0 }); } };
  const precedent = () => { setErr(''); setStep(etapes[Math.max(0, pos - 1)]); };

  const envoyer = async () => {
    const m = valide(); setErr(m); if (m) return;
    setSending(true);
    try {
      const r = await rpc<{ numero: string | null }>('submit_inscription', {
        type_demande: e.type, ...e.org, besoins: e.besoins, delais: e.delais, langue: 'fr',
        consentement: e.consentement, conditions: e.conditions, site_web: e.site_web,
        participants: devis || e.type === 'copaf' ? [] : e.participants,
        items: devis || e.type === 'copaf' ? [] : lignes.map((l) => ({ code: l.f.code, session: l.f.sessions[0]?.debut ?? null, nb_participants: l.nb, tarif_dg: !!e.dg[l.f.code] })),
      });
      setDone(r.numero ?? 'reçue');
      try { localStorage.removeItem(BROUILLON); } catch { /* ignore */ }
    } catch (x) { setErr((x as Error).message); } finally { setSending(false); }
  };

  if (done) return (
    <section className="section section--light">
      <Seo path="/inscription" title="Demande envoyée" description="Confirmation de votre demande d’inscription." noindex />
      <div className="container narrow">
        <div className="card confirm" role="status">
          <CheckCircle2 aria-hidden="true" className="confirm__icon" />
          <h1 className="h2">Votre demande est bien enregistrée</h1>
          <p className="lead">Numéro de dossier : <strong className="dossier">{done}</strong></p>
          <p>Il s’agit d’une <strong>demande d’inscription</strong> : elle est confirmée après réception de la facture proforma réglée. L’équipe CRF Perfection vous adresse la proforma à l’adresse {e.org.contact_email}.</p>
          {lignes.length > 0 && <Recap lignes={lignes} total={total} />}
          <div className="btn-row">
            <button type="button" className="btn btn--outline" onClick={() => window.print()}><Printer aria-hidden="true" /> Imprimer le récapitulatif</button>
            <Link to="/catalogue-2027" className="btn btn--primary">Retour au catalogue</Link>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Seo path="/inscription" title="Inscription aux formations 2027" description="Inscrivez vos équipes aux formations CRF Perfection 2027, demandez un programme sur mesure ou pré-inscrivez-vous à la COPAF 2027." />
      <section className="section section--dark on-dark page-hero" aria-labelledby="ins-t">
        <div className="container hero__copy">
          <span className="eyebrow">Inscription</span>
          <h1 id="ins-t" className="h1">S’inscrire ou demander un <span className="accent">programme</span></h1>
          <p className="hero__lead">Formulaire en {etapes.length} étapes. Votre brouillon est enregistré dans ce navigateur.</p>
        </div>
      </section>

      <section className="section section--light">
        <div className="container narrow">
          <ol className="progress" aria-label="Étapes">
            {etapes.map((s, n) => <li key={s} aria-current={s === step ? 'step' : undefined} className={n < pos ? 'is-done' : ''}><span>{n + 1}</span>{ETAPES[s]}</li>)}
          </ol>

          <form className="card form" onSubmit={(ev) => { ev.preventDefault(); if (step === 4) envoyer(); else suivant(); }} noValidate>
            <h2 className="h3">{ETAPES[step]}</h2>
            <label className="hp" aria-hidden="true">Site web <input tabIndex={-1} autoComplete="off" value={e.site_web} onChange={(x) => upd({ site_web: x.target.value })} /></label>

            {step === 0 && (
              <fieldset className="choices"><legend className="sr-only">Type de demande</legend>
                {TYPES.map((t) => (
                  <label key={t.k} className={`choice${e.type === t.k ? ' is-checked' : ''}`}>
                    <input type="radio" name="type" checked={e.type === t.k} onChange={() => upd({ type: t.k })} />
                    <strong>{t.t}</strong><span>{t.d}</span>
                  </label>
                ))}
                {e.type === 'copaf' && <p className="note">Pour l’édition en cours, rendez-vous sur <a href={SITE.copafUrl} target="_blank" rel="noopener">copaf-ports.com</a>. Ce formulaire enregistre votre intérêt pour la COPAF 2027.</p>}
              </fieldset>
            )}

            {step === 1 && (
              <>
                <label className="field field--block"><span>Rechercher par code ou mot-clé</span>
                  <input type="search" value={q} onChange={(x) => setQ(x.target.value)} placeholder="T2, cybersécurité…" /></label>
                {(['T', 'W', 'C'] as Famille[]).map((k) => {
                  const items = INSCRIPTIBLES.filter((f) => f.famille === k && (!q || `${f.code} ${f.intitule}`.toLowerCase().includes(q.toLowerCase())));
                  if (!items.length) return null;
                  return (
                    <fieldset key={k} className="pick"><legend>{FAMILLES[k].nom}</legend>
                      {items.map((f) => (
                        <label key={f.code} className="pick__row">
                          <input type="checkbox" checked={e.codes.includes(f.code)} onChange={() => upd({ codes: e.codes.includes(f.code) ? e.codes.filter((c) => c !== f.code) : [...e.codes, f.code] })} />
                          <span className="badge">{f.code}</span>
                          <span className="pick__main"><strong>{f.intitule}</strong><span>{f.periode} · {f.lieu}</span></span>
                          <span className="pick__price">{f.cout ?? 'Sur demande'}</span>
                        </label>
                      ))}
                    </fieldset>
                  );
                })}
                {e.codes.includes('T1') && (
                  <label className="check"><input type="checkbox" checked={!!e.dg.T1} onChange={(x) => upd({ dg: { ...e.dg, T1: x.target.checked } })} /> T1 : appliquer le tarif « DG » (5 000 €) au lieu du tarif « Autres » (4 000 €)</label>
                )}
                {alertes.map((a) => <p key={a} className="warn" role="alert"><AlertTriangle aria-hidden="true" /> {a} Vous pouvez continuer, mais une même personne ne pourra pas suivre les deux.</p>)}
              </>
            )}

            {step === 2 && (
              <>
                {e.participants.map((p, i) => (
                  <fieldset key={i} className="participant"><legend>Participant {i + 1}</legend>
                    <div className="form-grid">
                      <label className="field field--block"><span>Civilité</span><select value={p.civilite} onChange={(x) => updPart(i, { civilite: x.target.value })}><option value="">—</option><option>Mme</option><option>M.</option></select></label>
                      <Champ l="Nom *" v={p.nom} on={(v) => updPart(i, { nom: v })} ac="family-name" />
                      <Champ l="Prénom *" v={p.prenom} on={(v) => updPart(i, { prenom: v })} ac="given-name" />
                      <Champ l="Fonction" v={p.fonction} on={(v) => updPart(i, { fonction: v })} ac="organization-title" />
                      <Champ l="E-mail *" t="email" v={p.email} on={(v) => updPart(i, { email: v })} ac="email" />
                      <Champ l="Téléphone" t="tel" v={p.telephone} on={(v) => updPart(i, { telephone: v })} ac="tel" />
                      <Champ l="Nationalité" v={p.nationalite} on={(v) => updPart(i, { nationalite: v })} />
                    </div>
                    <fieldset className="pick pick--inline"><legend>Formations suivies</legend>
                      {e.codes.map((c) => (
                        <label key={c} className="check"><input type="checkbox" checked={p.codes.includes(c) || p.codes.length === 0}
                          onChange={(x) => { const cur = p.codes.length ? p.codes : [...e.codes]; updPart(i, { codes: x.target.checked ? [...new Set([...cur, c])] : cur.filter((y) => y !== c) }); }} /> {c}</label>
                      ))}
                    </fieldset>
                    <label className="field field--block"><span>Besoins particuliers (accessibilité, régime alimentaire), facultatif</span>
                      <input value={p.besoins_particuliers} onChange={(x) => updPart(i, { besoins_particuliers: x.target.value })} /></label>
                    {e.participants.length > 1 && <button type="button" className="btn-text" onClick={() => upd({ participants: e.participants.filter((_, n) => n !== i) })}><Trash2 aria-hidden="true" /> Retirer ce participant</button>}
                  </fieldset>
                ))}
                {e.participants.length < 10 && <button type="button" className="btn btn--outline" onClick={() => upd({ participants: [...e.participants, vide()] })}><Plus aria-hidden="true" /> Ajouter un participant</button>}
              </>
            )}

            {step === 3 && (
              <div className="form-grid">
                <Champ l="Organisation *" v={e.org.organisation} on={(v) => updOrg('organisation', v)} ac="organization" />
                <label className="field field--block"><span>Type d’organisation</span>
                  <select value={e.org.type_organisation} onChange={(x) => updOrg('type_organisation', x.target.value)}>
                    <option value="">—</option><option>Autorité portuaire</option><option>Opérateur / terminal</option><option>Administration</option><option>Autre</option>
                  </select></label>
                <Champ l="Pays" v={e.org.pays} on={(v) => updOrg('pays', v)} ac="country-name" />
                <Champ l="Nom du contact *" v={e.org.contact_nom} on={(v) => updOrg('contact_nom', v)} ac="name" />
                <Champ l="E-mail du contact *" t="email" v={e.org.contact_email} on={(v) => updOrg('contact_email', v)} ac="email" />
                <Champ l="Téléphone du contact" t="tel" v={e.org.contact_telephone} on={(v) => updOrg('contact_telephone', v)} ac="tel" />
                {devis ? (
                  <>
                    <label className="field field--block field--wide"><span>Projet et besoins *</span><textarea rows={5} value={e.besoins} onChange={(x) => upd({ besoins: x.target.value })} placeholder={e.type === 'sur_mesure' ? 'Programmes B envisagés, projet du port, équipes concernées…' : 'Formation recherchée, public, objectifs…'} /></label>
                    <Champ l="Délais souhaités" v={e.delais} on={(v) => upd({ delais: v })} wide />
                  </>
                ) : e.type === 'copaf' ? (
                  <label className="field field--block field--wide"><span>Message (facultatif)</span><textarea rows={4} value={e.besoins} onChange={(x) => upd({ besoins: x.target.value })} placeholder="Nombre de personnes intéressées, fonctions…" /></label>
                ) : (
                  <>
                    <label className="field field--block field--wide"><span>Adresse de facturation</span><textarea rows={3} value={e.org.adresse_facturation} onChange={(x) => updOrg('adresse_facturation', x.target.value)} autoComplete="street-address" /></label>
                    <Champ l="Référent facturation" v={e.org.referent_facturation} on={(v) => updOrg('referent_facturation', v)} />
                    <Champ l="N° de bon de commande (facultatif)" v={e.org.bon_commande} on={(v) => updOrg('bon_commande', v)} />
                    <p className="note field--wide">Mode de règlement : virement bancaire sur facture proforma, émise par l’équipe CRF Perfection. Aucun paiement en ligne.</p>
                  </>
                )}
              </div>
            )}

            {step === 4 && (
              <>
                <dl className="recap-org">
                  <div><dt>Type de demande</dt><dd>{TYPES.find((t) => t.k === e.type)?.t}</dd></div>
                  <div><dt>Organisation</dt><dd>{e.org.organisation} {e.org.pays && `(${e.org.pays})`}</dd></div>
                  <div><dt>Contact</dt><dd>{e.org.contact_nom} · {e.org.contact_email}</dd></div>
                  {!devis && e.type !== 'copaf' && <div><dt>Participants</dt><dd>{e.participants.map((p) => `${p.prenom} ${p.nom}`).join(', ')}</dd></div>}
                </dl>
                {!devis && e.type !== 'copaf' && <Recap lignes={lignes} total={total} />}
                {alertes.map((a) => <p key={a} className="warn"><AlertTriangle aria-hidden="true" /> {a}</p>)}
                <label className="check"><input type="checkbox" checked={e.conditions} onChange={(x) => upd({ conditions: x.target.checked })} required /> J’accepte les <Link to="/conditions-inscription" target="_blank">conditions d’inscription</Link>. *</label>
                <label className="check"><input type="checkbox" checked={e.consentement} onChange={(x) => upd({ consentement: x.target.checked })} required /> J’accepte que mes données soient traitées pour cette demande, conformément à la <Link to="/confidentialite" target="_blank">politique de confidentialité</Link>. *</label>
                <p className="note">Demande d’inscription : elle est confirmée après réception de la proforma réglée.</p>
              </>
            )}

            {err && <p className="error" role="alert">{err}</p>}
            <div className="form__nav">
              {pos > 0 && <button type="button" className="btn btn--outline" onClick={precedent}>Précédent</button>}
              <button type="submit" className="btn btn--primary" disabled={sending}>{step === 4 ? (sending ? 'Envoi…' : 'Envoyer la demande') : 'Continuer'}</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Recap({ lignes, total }: { lignes: { f: Formation; nb: number; t: number | null; total: number | null }[]; total: number }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr><th scope="col">Code</th><th scope="col">Session</th><th scope="col">Participants</th><th scope="col">Montant</th></tr></thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.f.code}><td><span className="badge">{l.f.reference}</span></td><td>{l.f.periode} · {l.f.lieu}</td><td>{l.nb}</td>
              <td>{l.total != null ? `${formatEuros(l.total)} (${l.nb} × ${formatEuros(l.t!)})` : 'Sur demande'}</td></tr>
          ))}
        </tbody>
        <tfoot><tr><th scope="row" colSpan={3}>Montant estimé (hors hébergement, non inclus)</th><td><strong>{total ? formatEuros(total) : '—'}</strong>{lignes.some((l) => l.total == null) && ' + lignes « sur demande »'}</td></tr></tfoot>
      </table>
    </div>
  );
}

function Champ({ l, v, on, t = 'text', ac, wide }: { l: string; v: string; on: (v: string) => void; t?: string; ac?: string; wide?: boolean }) {
  return (
    <label className={`field field--block${wide ? ' field--wide' : ''}`}><span>{l}</span>
      <input type={t} value={v} onChange={(x) => on(x.target.value)} autoComplete={ac} required={l.endsWith('*')} /></label>
  );
}
