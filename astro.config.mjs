// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // [Final domain to confirm]
  site: 'https://bizmeup.in',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/styleguide'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
