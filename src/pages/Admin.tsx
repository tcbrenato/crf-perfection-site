import { useEffect, useMemo, useState } from 'react';
import { Seo } from '@/lib/head';
import { admin } from '@/lib/api';

type Statut = 'nouvelle' | 'proforma_envoyee' | 'payee' | 'confirmee' | 'annulee';
interface Item { code: string; session: string | null; tarif_eur: number | null; nb_participants: number }
interface Dossier {
  id: number; numero: string; created_at: string; type_demande: string; statut: Statut; organisation: string; pays: string | null;
  contact_nom: string; contact_email: string; contact_telephone: string | null; montant_estime_eur: number | null; besoins: string | null;
  inscription_items: Item[]; participants: { nom: string; prenom: string; email: string; fonction: string | null }[];
}
interface Place { code: string; session: string | null; capacite: number | null; inscrits: number }
const STATUTS: Statut[] = ['nouvelle', 'proforma_envoyee', 'payee', 'confirmee', 'annulee'];

/** Mini-espace admin : Supabase Auth + RLS (seuls les comptes de la table admins voient les données). */
export function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [cred, setCred] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [rows, setRows] = useState<Dossier[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [contacts, setContacts] = useState<{ id: number; created_at: string; type: string; nom: string; email: string; organisation: string | null; codes: string[]; message: string }[]>([]);
  const [fCode, setFCode] = useState('');
  const [fStatut, setFStatut] = useState('');

  useEffect(() => { try { setToken(sessionStorage.getItem('crf-admin')); } catch { /* ignore */ } }, []);
  const charger = async (t: string) => {
    try {
      setRows(await admin.get<Dossier[]>('inscriptions?select=*,inscription_items(*),participants(nom,prenom,email,fonction)&order=created_at.desc', t));
      setPlaces(await admin.get<Place[]>('places_par_session?select=*', t));
      setContacts(await admin.get('contacts?select=*&order=created_at.desc', t));
      setErr('');
    } catch (x) { setErr((x as Error).message); }
  };
  useEffect(() => { if (token) charger(token); }, [token]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try { const t = await admin.login(cred.email, cred.password); sessionStorage.setItem('crf-admin', t); setToken(t); } catch (x) { setErr((x as Error).message); }
  };
  const filtres = useMemo(() => rows.filter((r) => (!fStatut || r.statut === fStatut) && (!fCode || r.inscription_items.some((i) => i.code === fCode.toUpperCase()))), [rows, fCode, fStatut]);
  const changer = async (id: number, statut: Statut) => { await admin.patch(`inscriptions?id=eq.${id}`, { statut, updated_at: new Date().toISOString() }, token!); charger(token!); };
  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lignes = [['numero', 'date', 'type', 'statut', 'organisation', 'pays', 'contact', 'email', 'codes', 'participants', 'montant_estime_eur'].join(';'),
      ...filtres.map((r) => [r.numero, r.created_at, r.type_demande, r.statut, r.organisation, r.pays, r.contact_nom, r.contact_email,
        r.inscription_items.map((i) => i.code).join(' '), r.participants.map((p) => `${p.prenom} ${p.nom}`).join(' / '), r.montant_estime_eur].map(esc).join(';'))];
    const url = URL.createObjectURL(new Blob(['﻿' + lignes.join('\n')], { type: 'text/csv;charset=utf-8' }));
    Object.assign(document.createElement('a'), { href: url, download: 'inscriptions-crf-2027.csv' }).click();
  };

  return (
    <section className="section section--light">
      <Seo path="/admin" title="Administration" description="Espace réservé." noindex />
      <div className="container">
        <h1 className="h2">Administration des inscriptions</h1>
        {!token ? (
          <form className="card form narrow" onSubmit={login}>
            <label className="field field--block"><span>E-mail</span><input type="email" autoComplete="username" value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} /></label>
            <label className="field field--block"><span>Mot de passe</span><input type="password" autoComplete="current-password" value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} /></label>
            {err && <p className="error" role="alert">{err}</p>}
            <button className="btn btn--primary" type="submit">Se connecter</button>
          </form>
        ) : (
          <>
            <div className="btn-row admin-bar">
              <label className="field"><span className="sr-only">Code</span><input placeholder="Filtrer par code (T2…)" value={fCode} onChange={(e) => setFCode(e.target.value)} /></label>
              <label className="field"><span className="sr-only">Statut</span><select value={fStatut} onChange={(e) => setFStatut(e.target.value)}><option value="">Tous statuts</option>{STATUTS.map((s) => <option key={s}>{s}</option>)}</select></label>
              <button className="btn btn--outline" type="button" onClick={exportCsv}>Exporter CSV</button>
              <button className="btn btn--outline" type="button" onClick={() => { sessionStorage.removeItem('crf-admin'); setToken(null); }}>Se déconnecter</button>
            </div>
            {err && <p className="error" role="alert">{err}</p>}
            <h2 className="h3">Places par session</h2>
            <div className="table-wrap"><table className="table"><thead><tr><th>Code</th><th>Session</th><th>Inscrits</th><th>Capacité</th></tr></thead>
              <tbody>{places.map((p) => <tr key={p.code + p.session}><td>{p.code}</td><td>{p.session ?? '—'}</td><td>{p.inscrits}</td><td>{p.capacite ?? '[À FOURNIR]'}</td></tr>)}</tbody></table></div>
            <h2 className="h3">Dossiers ({filtres.length})</h2>
            <div className="table-wrap"><table className="table">
              <thead><tr><th>N°</th><th>Date</th><th>Organisation</th><th>Contact</th><th>Codes</th><th>Participants</th><th>Montant</th><th>Statut</th></tr></thead>
              <tbody>{filtres.map((r) => (
                <tr key={r.id}><td>{r.numero}<br /><small>{r.type_demande}</small></td><td>{new Date(r.created_at).toLocaleDateString('fr-FR')}</td><td>{r.organisation}<br /><small>{r.pays}</small></td>
                  <td>{r.contact_nom}<br /><small>{r.contact_email}</small></td><td>{r.inscription_items.map((i) => i.code).join(', ') || <small>{r.besoins}</small>}</td>
                  <td>{r.participants.length}</td><td>{r.montant_estime_eur ? `${r.montant_estime_eur} €` : '—'}</td>
                  <td><select aria-label={`Statut ${r.numero}`} value={r.statut} onChange={(e) => changer(r.id, e.target.value as Statut)}>{STATUTS.map((s) => <option key={s}>{s}</option>)}</select></td></tr>
              ))}</tbody></table></div>
            <h2 className="h3">Messages et demandes de devis ({contacts.length})</h2>
            <div className="table-wrap"><table className="table"><thead><tr><th>Date</th><th>Type</th><th>Nom</th><th>Organisation</th><th>Codes</th><th>Message</th></tr></thead>
              <tbody>{contacts.map((c) => <tr key={c.id}><td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td><td>{c.type}</td><td>{c.nom}<br /><small>{c.email}</small></td><td>{c.organisation}</td><td>{c.codes.join(', ')}</td><td>{c.message}</td></tr>)}</tbody></table></div>
          </>
        )}
      </div>
    </section>
  );
}
