/**
 * Photos du site, chargées automatiquement depuis les dossiers :
 *   src/assets/realisations/   → galerie « Nos réalisations »
 *   src/assets/fabien.jpg      → portrait de l'électricien (accueil)
 *   src/assets/services/<adresse-du-service>.jpg → photo d'une page service
 * Il suffit de déposer un fichier : il apparaît sur le site, redimensionné et optimisé.
 */
import type { ImageMetadata } from 'astro';

type Module = { default: ImageMetadata };

const realisations = import.meta.glob<Module>('/src/assets/realisations/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});
const portraits = import.meta.glob<Module>('/src/assets/fabien.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});
const services = import.meta.glob<Module>('/src/assets/services/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

const nomFichier = (chemin: string) => chemin.split('/').pop()!.replace(/\.[^.]+$/, '');

/** « 02-remplacement-tableau-electrique-castries » → « Remplacement tableau electrique castries » */
function legende(chemin: string) {
  const texte = nomFichier(chemin)
    .replace(/^\d+[\s._-]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

export interface Photo {
  src: ImageMetadata;
  legende: string;
}

export const REALISATIONS: Photo[] = Object.entries(realisations)
  .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
  .map(([chemin, module]) => ({ src: module.default, legende: legende(chemin) }));

export const PORTRAIT: ImageMetadata | undefined = Object.values(portraits)[0]?.default;

export function photoService(slug: string): ImageMetadata | undefined {
  const trouve = Object.entries(services).find(([chemin]) => nomFichier(chemin) === slug);
  return trouve?.[1].default;
}
