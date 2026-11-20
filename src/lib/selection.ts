import { useCallback, useEffect, useState } from 'react';

const KEY = 'crf-selection-2027';
const EVT = 'crf-selection';

const lire = (): string[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
};

/** « Ma sélection » : panier léger stocké dans le navigateur (pas de compte). */
export function useSelection() {
  const [codes, setCodes] = useState<string[]>([]);
  useEffect(() => {
    setCodes(lire());
    const sync = () => setCodes(lire());
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener('storage', sync); };
  }, []);
  const ecrire = useCallback((next: string[]) => {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* stockage indisponible */ }
    setCodes(next);
    window.dispatchEvent(new Event(EVT));
  }, []);
  return {
    codes,
    has: (c: string) => codes.includes(c),
    toggle: (c: string) => ecrire(codes.includes(c) ? codes.filter((x) => x !== c) : [...codes, c]),
    clear: () => ecrire([]),
  };
}
