import { ENTREPRISE } from './entreprise';

/**
 * Communes desservies. Les coordonnées servent à dessiner la carte de la zone
 * d'intervention et à estimer la distance depuis Castries.
 * Les communes qui ont leur propre page sont celles présentes dans
 * src/content/villes/ (le lien se fait automatiquement via le « slug »).
 */
export interface Commune {
  nom: string;
  slug: string;
  cp: string;
  lat: number;
  lng: number;
}

export const COMMUNES: Commune[] = [
  { nom: 'Castries', slug: 'castries', cp: '34160', lat: 43.6797, lng: 3.9853 },
  { nom: 'Montpellier', slug: 'montpellier', cp: '34000', lat: 43.6108, lng: 3.8767 },
  { nom: 'Le Crès', slug: 'le-cres', cp: '34920', lat: 43.6481, lng: 3.94 },
  { nom: 'Vendargues', slug: 'vendargues', cp: '34740', lat: 43.6567, lng: 3.97 },
  { nom: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', cp: '34170', lat: 43.6336, lng: 3.9017 },
  { nom: 'Jacou', slug: 'jacou', cp: '34830', lat: 43.6611, lng: 3.9122 },
  { nom: 'Teyran', slug: 'teyran', cp: '34820', lat: 43.685, lng: 3.9286 },
  { nom: 'Baillargues', slug: 'baillargues', cp: '34670', lat: 43.6625, lng: 4.0122 },
  { nom: 'Saint-Aunès', slug: 'saint-aunes', cp: '34130', lat: 43.6406, lng: 3.9656 },
  { nom: 'Mauguio', slug: 'mauguio', cp: '34130', lat: 43.6158, lng: 4.0083 },
  { nom: 'Lattes', slug: 'lattes', cp: '34970', lat: 43.5672, lng: 3.9028 },
  { nom: 'Clapiers', slug: 'clapiers', cp: '34830', lat: 43.6578, lng: 3.8889 },
  { nom: 'Saint-Brès', slug: 'saint-bres', cp: '34670', lat: 43.6672, lng: 4.0306 },
  { nom: 'Sussargues', slug: 'sussargues', cp: '34160', lat: 43.7128, lng: 4.0028 },
  { nom: 'Saint-Drézéry', slug: 'saint-drezery', cp: '34160', lat: 43.7297, lng: 3.9769 },
  { nom: 'Guzargues', slug: 'guzargues', cp: '34820', lat: 43.7289, lng: 3.9264 },
  { nom: 'Assas', slug: 'assas', cp: '34820', lat: 43.7031, lng: 3.9 },
  { nom: 'Beaulieu', slug: 'beaulieu', cp: '34160', lat: 43.7283, lng: 4.0225 },
  { nom: 'Restinclières', slug: 'restinclieres', cp: '34160', lat: 43.7225, lng: 4.035 },
  { nom: 'Saint-Geniès-des-Mourgues', slug: 'saint-genies-des-mourgues', cp: '34160', lat: 43.6975, lng: 4.0367 },
  { nom: 'Montaud', slug: 'montaud', cp: '34160', lat: 43.7483, lng: 3.9606 },
  { nom: 'Prades-le-Lez', slug: 'prades-le-lez', cp: '34730', lat: 43.6981, lng: 3.865 },
  { nom: 'Montferrier-sur-Lez', slug: 'montferrier-sur-lez', cp: '34980', lat: 43.6681, lng: 3.8572 },
  { nom: 'Saint-Clément-de-Rivière', slug: 'saint-clement-de-riviere', cp: '34980', lat: 43.6833, lng: 3.8417 },
  { nom: 'Saint-Gély-du-Fesc', slug: 'saint-gely-du-fesc', cp: '34980', lat: 43.6928, lng: 3.8056 },
  { nom: 'Grabels', slug: 'grabels', cp: '34790', lat: 43.6483, lng: 3.7989 },
  { nom: 'Juvignac', slug: 'juvignac', cp: '34990', lat: 43.6136, lng: 3.8106 },
  { nom: 'Saint-Jean-de-Védas', slug: 'saint-jean-de-vedas', cp: '34430', lat: 43.5747, lng: 3.8269 },
  { nom: 'Lavérune', slug: 'laverune', cp: '34880', lat: 43.5872, lng: 3.8053 },
  { nom: 'Pérols', slug: 'perols', cp: '34470', lat: 43.565, lng: 3.9519 },
  { nom: 'Palavas-les-Flots', slug: 'palavas-les-flots', cp: '34250', lat: 43.5283, lng: 3.9317 },
];

/** Distance à vol d'oiseau en km (formule de haversine). */
function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Estimation de la distance par la route et du temps de trajet depuis Castries. */
export function trajetDepuisCastries(c: { lat: number; lng: number }) {
  const km = Math.max(1, Math.round(haversine(ENTREPRISE.geo, c) * 1.4));
  const minutes = Math.max(5, Math.round((km * 1.2 + 3) / 5) * 5);
  return { km, minutes };
}

export function communeParSlug(slug: string) {
  return COMMUNES.find((c) => c.slug === slug);
}

/** Les communes les plus proches d'une commune donnée (hors elle-même). */
export function communesVoisines(slug: string, n = 6) {
  const ref = communeParSlug(slug);
  if (!ref) return [];
  return COMMUNES.filter((c) => c.slug !== slug)
    .map((c) => ({ ...c, d: haversine(ref, c) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n);
}

/** Préposition correcte devant un nom de commune : « à Castries », « au Crès », « aux Matelles ». */
export const aVille = (nom: string) =>
  nom.startsWith('Le ') ? `au ${nom.slice(3)}` : nom.startsWith('Les ') ? `aux ${nom.slice(4)}` : `à ${nom}`;
