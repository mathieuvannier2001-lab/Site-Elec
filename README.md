# Site AMCF – Électricien à Castries et Montpellier

Site vitrine statique construit avec [Astro](https://astro.build) : très rapide, sans base de données, optimisé pour le référencement local (Google, Google Maps, assistants IA).

## Modifier le site

| Je veux changer…                                   | Fichier à modifier                       |
| -------------------------------------------------- | ---------------------------------------- |
| Téléphone, horaires, e-mail, adresse, réseaux, SIRET | `src/data/entreprise.ts`                 |
| Un service (texte, prestations, FAQ)               | `src/content/services/<service>.md`      |
| Une page ville                                     | `src/content/villes/<ville>.md`          |
| La liste des communes desservies (carte)           | `src/data/communes.ts`                   |
| Un article de conseils                             | `src/content/conseils/<article>.md`      |
| La page d'accueil                                  | `src/pages/index.astro`                  |
| Les couleurs et la typographie                     | `src/styles/global.css`                  |

- **Ajouter un service** : copier un fichier de `src/content/services/`, le renommer (le nom du fichier devient l'adresse de la page) et adapter le contenu. Il apparaît automatiquement dans le menu, la page d'accueil, le pied de page et le sitemap.
- **Ajouter une ville** : ajouter la commune dans `src/data/communes.ts` (avec le même « slug »), puis créer `src/content/villes/<slug>.md`. Écrire un texte **propre à la commune** : Google pénalise les pages villes copiées-collées.
- **Ajouter un article** : créer un fichier dans `src/content/conseils/`.
- Les champs `titreSeo` (≈ 60 caractères) et `description` (≈ 150 caractères) sont ce qu'affiche Google : les soigner.

Depuis GitHub : ouvrir le fichier, cliquer sur le crayon ✏️, modifier, puis « Commit changes ». Le site en ligne se met à jour tout seul en une minute environ.

## Développement local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère le site dans dist/
```

Node.js 22 ou plus récent est nécessaire.

## Mise en ligne (Netlify)

1. Sur [netlify.com](https://www.netlify.com), « Add new site » → « Import an existing project » → GitHub → ce dépôt. Les réglages sont lus dans `netlify.toml`.
2. Dans **Site configuration → Forms**, activer la détection des formulaires (« Enable form detection ») pour recevoir les demandes de devis, puis ajouter une notification par e-mail.
3. Relier le nom de domaine `amcf-electricien.fr` (adresse principale : `https://www.amcf-electricien.fr`, définie dans `astro.config.mjs`).

## Référencement : ce qui est en place

- Une page par service et par commune principale, avec un texte propre à chacune.
- Balises title et description uniques, URL canoniques, Open Graph (aperçu de partage).
- Données structurées schema.org : `Electrician` (entreprise locale), `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`.
- `sitemap-index.xml`, `robots.txt` et `llms.txt` (résumé pour les assistants IA).
- Maillage interne : services ↔ villes ↔ articles.
- Performance : aucune dépendance externe, police allégée, CSS intégré — score Lighthouse 100 en performance et en SEO.

## Avant la mise en ligne définitive

- [ ] Compléter les mentions légales dans `src/data/entreprise.ts` (SIRET, assurance décennale, médiateur…).
- [ ] Ajouter des **photos** de chantiers (idéalement de vraies réalisations).
- [ ] Vérifier les qualifications annoncées (IRVE pour les bornes de recharge > 3,7 kW).
- [ ] Créer la fiche **Google Business Profile** et ajouter son lien dans `reseaux.google`.
- [ ] Déclarer le site dans **Google Search Console** et y soumettre `sitemap-index.xml`.
- [ ] Demander des avis Google aux clients satisfaits.

## Crédits

- Police Archivo — SIL Open Font License 1.1 (`public/fonts/OFL.txt`).
- Photos d'illustration des pages services (`src/assets/services/`) — Unsplash, licence Unsplash. À remplacer par de vraies photos de chantiers dès que possible.
- Certaines icônes s'inspirent du jeu Lucide (licence ISC).
