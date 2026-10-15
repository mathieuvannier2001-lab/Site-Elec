import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ENTREPRISE } from '../data/entreprise';
import { COMMUNES } from '../data/communes';

/**
 * Résumé du site au format llms.txt, lu par les assistants IA (ChatGPT,
 * Perplexity, Claude…) pour comprendre rapidement l'activité et la zone.
 */
export const GET: APIRoute = async ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const services = (await getCollection('services')).sort((a, b) => a.data.ordre - b.data.ordre);
  const villes = (await getCollection('villes')).sort((a, b) => a.data.nom.localeCompare(b.data.nom, 'fr'));
  const conseils = await getCollection('conseils');

  const body = `# ${ENTREPRISE.nom} – Électricien à Castries et Montpellier

> ${ENTREPRISE.nomLong}. Électricien basé à Castries (${ENTREPRISE.adresse.codePostal}, Hérault), intervenant à Montpellier et dans sa périphérie (rayon d'environ ${ENTREPRISE.rayonKm} km). Dépannage électrique 7j/7 sur demande, courant fort, courant faible, automatismes et maintenance, pour particuliers et professionnels. Téléphone : ${ENTREPRISE.telephone}. Devis gratuit.

## Services
${services.map((s) => `- [${s.data.nomCourt}](${url(`/services/${s.id}/`)}): ${s.data.resume}`).join('\n')}

## Zones d'intervention
${villes.map((v) => `- [Électricien à ${v.data.nom}](${url(`/electricien-${v.id}/`)})`).join('\n')}
- Autres communes desservies : ${COMMUNES.map((c) => c.nom).join(', ')}

## Conseils
${conseils.map((c) => `- [${c.data.titre}](${url(`/conseils/${c.id}/`)}): ${c.data.description}`).join('\n')}

## Contact
- [Contact et devis gratuit](${url('/contact/')})
- Téléphone : ${ENTREPRISE.telephone}
- Horaires : ${ENTREPRISE.horaires.map((h) => `${h.jours} : ${h.heures}`).join(' ; ')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
