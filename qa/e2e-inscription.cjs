// Parcours complet : ?code=T4,T5 → 2 participants → organisation → envoi → n° de dossier ; puis lecture publique refusée.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('http://localhost:4173/inscription/?code=T4,C3', { waitUntil: 'networkidle' });
  // étape Formations : ajoute C1 (même dates que C3 → chevauchement attendu)
  await p.getByText('Diagnostic de maturité digitale', { exact: false }).first().click();
  const alerte = await p.locator('.warn').first().textContent();
  console.log('Chevauchement :', alerte.trim().slice(0, 90));
  await p.getByRole('button', { name: 'Continuer' }).click();
  const fill = async (i, nom, prenom, email) => {
    const fs = p.locator('fieldset.participant').nth(i);
    await fs.getByLabel('Nom *', { exact: true }).fill(nom); await fs.getByLabel('Prénom *').fill(prenom); await fs.getByLabel('E-mail *').fill(email);
  };
  await fill(0, 'TEST-QA', 'Awa', 'qa1@example.com');
  await p.getByRole('button', { name: 'Ajouter un participant' }).click();
  await fill(1, 'TEST-QA', 'Kofi', 'qa2@example.com');
  await p.getByRole('button', { name: 'Continuer' }).click();
  await p.getByLabel('Organisation *').fill('TEST QA — à supprimer');
  await p.getByLabel('Nom du contact *').fill('Contact QA');
  await p.getByLabel('E-mail du contact *').fill('qa-contact@example.com');
  await p.getByRole('button', { name: 'Continuer' }).click();
  console.log('Récap total :', (await p.locator('tfoot').textContent()).trim());
  await p.getByLabel(/conditions d’inscription/).check();
  await p.getByLabel(/politique de confidentialité/).check();
  await p.getByRole('button', { name: 'Envoyer la demande' }).click();
  await p.waitForSelector('.dossier', { timeout: 15000 });
  console.log('Dossier :', await p.locator('.dossier').textContent());
  await p.screenshot({ path: process.argv[2] + '/e2e-confirmation.png' });
  // lecture publique avec la clé publique : doit renvoyer []
  const r = await p.evaluate(async () => {
    const k = 'sb_publishable_9_SHqP6154EfPFk2o8NpBQ_7WyPBuin';
    const x = await fetch('https://ivgxquhehuxqdxgnbmvf.supabase.co/rest/v1/inscriptions?select=*', { headers: { apikey: k, Authorization: 'Bearer ' + k } });
    return x.status + ' ' + (await x.text());
  });
  console.log('Lecture publique :', r);
  await b.close();
})().catch((e) => { console.error('ECHEC', e.message); process.exit(1); });
