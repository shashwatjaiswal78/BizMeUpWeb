// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // [Final domain to confirm]
  site: 'https://bizmeup.in',
  output: 'static',
  // Inline all CSS so no stylesheet blocks the first paint (Lighthouse: ~1s saved on mobile).
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/styleguide'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
