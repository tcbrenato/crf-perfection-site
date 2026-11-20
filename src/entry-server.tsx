import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { HeadProvider, renderHead, type HeadData } from '@/lib/head';
import { ROUTES } from '@/routes';

export const routes = ROUTES.map((r) => r.path).concat('/404');

export function render(url: string) {
  const store: { data?: HeadData } = {};
  const html = renderToString(
    <StrictMode>
      <HeadProvider store={store}>
        <StaticRouter location={url}><App /></StaticRouter>
      </HeadProvider>
    </StrictMode>,
  );
  return { html, head: store.data ? renderHead(store.data) : '', noindex: !!store.data?.noindex };
}
