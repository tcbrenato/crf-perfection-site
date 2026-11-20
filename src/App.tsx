import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@/styles/global.css';
import '@/styles/layout.css';
import '@/styles/v3.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NotFound } from '@/pages/NotFound';
import { ROUTES } from '@/routes';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <>
      <ScrollReset />
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Routes>
          {ROUTES.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
