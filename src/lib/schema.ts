/**
 * Données structurées (schema.org, format JSON-LD).
 * Elles décrivent l'entreprise, les pages et les services à Google et aux
 * moteurs de réponse (ChatGPT, Perplexity…), ce qui aide à apparaître dans les
 * résultats locaux et les extraits enrichis.
 */
import { ENTREPRISE } from '../data/entreprise';
import { COMMUNES } from '../data/communes';

type Json = Record<string, unknown>;

export const abs = (site: URL, path = '/') => new URL(path, site).href;
export const idEntreprise = (site: URL) => abs(site, '/#entreprise');
export const idSite = (site: URL) => abs(site, '/#site');

const nonVides = (values: string[]) => values.filter((v) => v && v.trim() !== '');

export function entreprise(site: URL, services: { nom: string; url: string }[] = []): Json {
  const a = ENTREPRISE.adresse;
  return {
    '@type': 'Electrician',
    '@id': idEntreprise(site),
    name: ENTREPRISE.nom,
    alternateName: ENTREPRISE.nomLong,
    description:
      'Électricien basé à Castries (34160) : dépannage électrique 7j/7 sur demande, tableau électrique, mise aux normes, rénovation, automatismes de portail et volets, courant faible et maintenance. Intervention à Montpellier et dans sa périphérie.',
    url: abs(site, '/'),
    telephone: ENTREPRISE.telephoneLien,
    ...(ENTREPRISE.email ? { email: ENTREPRISE.email } : {}),
    logo: abs(site, '/logo-amcf.png'),
    image: abs(site, '/og/amcf-electricien-castries.png'),
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Espèces, Chèque, Virement',
    address: {
      '@type': 'PostalAddress',
      ...(a.rue ? { streetAddress: a.rue } : {}),
      postalCode: a.codePostal,
      addressLocality: a.ville,
      addressRegion: a.region,
      addressCountry: a.pays,
    },
    geo: { '@type': 'GeoCoordinates', latitude: ENTREPRISE.geo.lat, longitude: ENTREPRISE.geo.lng },
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: ENTREPRISE.geo.lat, longitude: ENTREPRISE.geo.lng },
        geoRadius: ENTREPRISE.rayonKm * 1000,
      },
      ...COMMUNES.map((c) => ({ '@type': 'City', name: c.nom })),
    ],
    openingHoursSpecification: ENTREPRISE.horairesSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: [
      'Dépannage électrique',
      'Tableau électrique',
      'Norme NF C 15-100',
      'Rénovation électrique',
      'Motorisation de portail',
      'Volets roulants électriques',
      'Courant faible',
      'Réseau informatique',
      'Interphone et visiophone',
      'Vidéosurveillance',
      'Borne de recharge',
      'Éclairage LED',
      'Domotique',
      'Maintenance électrique',
    ],
    ...(services.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Prestations d’électricité',
            itemListElement: services.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s.nom, url: s.url },
            })),
          },
        }
      : {}),
    sameAs: nonVides(Object.values(ENTREPRISE.reseaux)),
  };
}

export function siteWeb(site: URL): Json {
  return {
    '@type': 'WebSite',
    '@id': idSite(site),
    url: abs(site, '/'),
    name: `${ENTREPRISE.nom} – Électricien à Castries et Montpellier`,
    inLanguage: 'fr-FR',
    publisher: { '@id': idEntreprise(site) },
  };
}

export function pageWeb(
  site: URL,
  opts: { path: string; titre: string; description: string; type?: string; avecFilAriane?: boolean },
): Json {
  const url = abs(site, opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#page`,
    url,
    name: opts.titre,
    description: opts.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': idSite(site) },
    about: { '@id': idEntreprise(site) },
    ...(opts.avecFilAriane ? { breadcrumb: { '@id': `${url}#fil-ariane` } } : {}),
  };
}

export function filAriane(site: URL, path: string, items: { nom: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(site, path)}#fil-ariane`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nom,
      item: abs(site, it.path),
    })),
  };
}

export function service(
  site: URL,
  opts: { path: string; nom: string; description: string; categorie: string; zone?: string },
): Json {
  const url = abs(site, opts.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.nom,
    serviceType: opts.nom,
    category: opts.categorie,
    description: opts.description,
    url,
    provider: { '@id': idEntreprise(site) },
    areaServed: opts.zone
      ? { '@type': 'City', name: opts.zone }
      : COMMUNES.map((c) => ({ '@type': 'City', name: c.nom })),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: ENTREPRISE.telephoneLien, contactType: 'customer service' },
    },
  };
}

export function faq(site: URL, path: string, items: { q: string; r: string }[]): Json | null {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${abs(site, path)}#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.r },
    })),
  };
}

export function article(
  site: URL,
  opts: { path: string; titre: string; description: string; date: Date; maj?: Date; image: string },
): Json {
  const url = abs(site, opts.path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: opts.titre,
    description: opts.description,
    datePublished: opts.date.toISOString(),
    dateModified: (opts.maj ?? opts.date).toISOString(),
    inLanguage: 'fr-FR',
    mainEntityOfPage: { '@id': `${url}#page` },
    image: abs(site, opts.image),
    author: { '@id': idEntreprise(site) },
    publisher: { '@id': idEntreprise(site) },
  };
}

export function graphe(...nodes: (Json | null | undefined)[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
