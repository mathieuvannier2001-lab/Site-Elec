import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), r: z.string() })).default([]);

/** Une page par prestation : src/content/services/<adresse-de-la-page>.md */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    ordre: z.number(),
    nomCourt: z.string(), // libellé du menu et des cartes
    titre: z.string(), // titre principal (H1)
    titreSeo: z.string().max(65), // balise <title> (≈ 60 caractères max)
    description: z.string().max(160), // description affichée par Google
    resume: z.string(), // texte court des cartes de la page d'accueil
    icone: z.string(),
    categorie: z.enum(['Courant fort', 'Courant faible', 'Automatisme', 'Maintenance']),
    prestations: z.array(z.string()),
    faq,
  }),
});

/** Une page par commune : src/content/villes/<slug-de-la-commune>.md */
const villes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/villes' }),
  schema: z.object({
    nom: z.string(),
    titreSeo: z.string().max(65),
    description: z.string().max(160),
    accroche: z.string(),
    secteurs: z.array(z.string()).default([]),
    faq,
  }),
});

/** Articles de conseils : src/content/conseils/<adresse-de-l-article>.md */
const conseils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conseils' }),
  schema: z.object({
    titre: z.string(),
    titreSeo: z.string().max(65),
    description: z.string().max(160),
    date: z.coerce.date(),
    miseAJour: z.coerce.date().optional(),
    tempsLecture: z.number(),
    servicesLies: z.array(z.string()).default([]),
    faq,
  }),
});

/** Pages « service + ville » : src/content/localisees/<service>--<ville>.md → /services/<service>/<ville>/ */
const localisees = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/localisees' }),
  schema: z.object({
    service: z.string(),
    ville: z.string(),
    titre: z.string(),
    titreSeo: z.string().max(65),
    description: z.string().max(160),
    accroche: z.string(),
    quartiers: z.array(z.string()).default([]),
    faq,
  }),
});

export const collections = { services, villes, conseils, localisees };
