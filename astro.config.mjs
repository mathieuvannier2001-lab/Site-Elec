// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresse publique du site, utilisée pour les URL canoniques, le sitemap et les
// balises Open Graph. Ordre de priorité :
//   1. SITE_URL (à définir quand le nom de domaine sera acheté, ex. https://www.amcf-electricite.fr)
//   2. URL, fournie automatiquement par Netlify au moment du déploiement
//   3. une valeur par défaut pour le développement local
const SITE = process.env.SITE_URL || process.env.URL || 'https://amcf-electricite.netlify.app';

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
      changefreq: 'monthly',
      lastmod: new Date(),
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
