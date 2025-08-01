import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://koldreams.com/focomo',
  integrations: [
    UnoCSS({ injectReset: true }),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  build: {
    assets: 'assets'
  },
  compressHTML: true,
  vite: {
    optimizeDeps: {
      exclude: ['astro:content']
    }
  }
});