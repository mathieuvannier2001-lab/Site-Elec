/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INFORMATIONS DE L'ENTREPRISE
 *  C'est le seul fichier à modifier pour changer le téléphone, les horaires,
 *  l'adresse, etc. Tout le site (pages, Google, réseaux sociaux) se met à jour.
 *  Les valeurs marquées « À COMPLÉTER » sont à renseigner avant la mise en ligne.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const ENTREPRISE = {
  nom: 'AMCF',
  nomLong: 'AMCF – Automatisme Maintenance Courant Fort et Faible',
  metier: 'Électricien',
  artisan: 'Fabien', // prénom de l'électricien, affiché sur le site
  signature: 'Automatisme · Maintenance · Courant fort et faible',

  telephone: '06 65 95 33 04',
  telephoneLien: '+33665953304',
  email: '', // À COMPLÉTER (ex. contact@amcf-electricite.fr)

  adresse: {
    rue: '', // À COMPLÉTER si vous souhaitez l'afficher (facultatif pour un artisan qui se déplace)
    codePostal: '34160',
    ville: 'Castries',
    departement: 'Hérault',
    region: 'Occitanie',
    pays: 'FR',
  },
  geo: { lat: 43.6797, lng: 3.9853 },

  // Horaires affichés sur le site et transmis à Google.
  horaires: [
    { jours: 'Lundi – Vendredi', heures: '7 h 30 – 19 h 00' },
    { jours: 'Samedi – Dimanche', heures: 'Dépannage sur demande' },
  ],
  horairesSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '19:00' },
    { days: ['Saturday', 'Sunday'], opens: '08:00', closes: '19:00' },
  ],
  disponibilite: 'Disponible 7j/7 · dépannage sur demande',

  // Qualifications et garanties affichées sur le site et transmises à Google.
  certifications: [
    { nom: 'Qualification IRVE', detail: 'Installation de bornes de recharge' },
    { nom: 'Assurance décennale', detail: 'Travaux garantis 10 ans' },
    { nom: 'Habilitations électriques', detail: 'Interventions en sécurité' },
    { nom: 'Norme NF C 15-100', detail: 'Installations conformes' },
  ],

  // Rayon d'intervention autour de Castries (en km), utilisé pour Google.
  rayonKm: 30,

  // Liens vers les profils publics (fiche Google, Facebook, Instagram…). Laisser vide si inexistant.
  reseaux: {
    google: '', // À COMPLÉTER : lien de la fiche Google Business Profile
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  // Mentions légales — À COMPLÉTER avant la mise en ligne.
  legal: {
    formeJuridique: '[forme juridique – ex. EI, EURL, SASU]',
    dirigeant: 'Fabien [NOM À COMPLÉTER]',
    siret: '[numéro SIRET]',
    rcsOuRm: '[immatriculation RCS ou RNE]',
    tva: '[numéro de TVA intracommunautaire]',
    // Valeur provisoire : remplacer par l'assureur, le n° de contrat et la zone couverte réels.
    assurance:
      'Assurance responsabilité civile décennale – Assureur : [À COMPLÉTER] – Contrat n° 0000000 – Couverture : France métropolitaine',
    mediateur: '[nom et site du médiateur de la consommation]',
  },

  // Codes de vérification fournis par Google Search Console et Bing Webmaster Tools
  // (méthode « balise HTML » : ne copier que la valeur de l'attribut content).
  verification: {
    google: '',
    bing: '',
  },

  hebergeur: {
    nom: 'Netlify, Inc.',
    adresse: '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
    site: 'https://www.netlify.com',
  },
} as const;

export const telHref = `tel:${ENTREPRISE.telephoneLien}`;
