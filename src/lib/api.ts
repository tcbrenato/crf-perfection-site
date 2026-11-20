/** Appels Supabase sans SDK (REST). Seules les fonctions submit_* sont accessibles au public. */
const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const apiDisponible = Boolean(URL_ && KEY);

const MESSAGES: Record<string, string> = {
  champs_invalides: 'Certains champs obligatoires sont manquants ou invalides.',
  consentement_requis: 'Merci d’accepter les conditions et la politique de confidentialité.',
  trop_de_demandes: 'Trop de demandes envoyées depuis cette adresse. Merci de réessayer dans une heure.',
  participant_invalide: 'Un participant n’a pas de nom, de prénom ou d’e-mail valide.',
  code_inconnu: 'Un code de formation est inconnu.',
};

export async function rpc<T = unknown>(fn: 'submit_contact' | 'submit_inscription', payload: object, token?: string): Promise<T> {
  if (!apiDisponible) throw new Error('Le service d’envoi n’est pas configuré. Écrivez-nous à contact@crfperfection.pro.');
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: KEY!, Authorization: `Bearer ${token ?? KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p: payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const code = String(data?.message ?? '');
    throw new Error(MESSAGES[code] ?? 'L’envoi a échoué. Merci de réessayer ou d’écrire à contact@crfperfection.pro.');
  }
  return data as T;
}

/** Accès admin (Supabase Auth, mot de passe défini dans le tableau de bord Supabase). */
export const admin = {
  async login(email: string, password: string): Promise<string> {
    const r = await fetch(`${URL_}/auth/v1/token?grant_type=password`, {
      method: 'POST', headers: { apikey: KEY!, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }),
    });
    const d = await r.json();
    if (!r.ok) throw new Error('Identifiants refusés.');
    return d.access_token as string;
  },
  async get<T>(path: string, token: string): Promise<T> {
    const r = await fetch(`${URL_}/rest/v1/${path}`, { headers: { apikey: KEY!, Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error('Lecture refusée (compte non administrateur ?).');
    return r.json();
  },
  async patch(path: string, body: object, token: string) {
    const r = await fetch(`${URL_}/rest/v1/${path}`, {
      method: 'PATCH', headers: { apikey: KEY!, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error('Modification refusée.');
  },
};
