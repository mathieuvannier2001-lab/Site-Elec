// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresse publique du site, utilisée pour les URL canoniques, le sitemap et les
// balises Open Graph. La variable d'environnement SITE_URL permet de la remplacer.
const SITE = process.env.SITE_URL || 'https://www.amcf-electricien.fr';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Tout le CSS est injecté dans la page : aucune requête bloquante au chargement.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|404)\/?$/.test(page),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') item.priority = 1.0;
        else if (path.startsWith('/services/') || path.startsWith('/electricien-')) item.priority = 0.8;
        else if (path.startsWith('/conseils/')) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
    }),
  ],
});
