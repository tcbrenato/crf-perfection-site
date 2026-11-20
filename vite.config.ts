import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: { assetsInlineLimit: 0 },
  ssr: { noExternal: ['@fontsource/inter'] },
});
