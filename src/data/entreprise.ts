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
  email: 'fbonfils@amcf-electricien.fr',

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
    { jours: 'Lundi – Vendredi', heures: '7 h 00 – 18 h 00' },
    { jours: 'Samedi – Dimanche', heures: 'Dépannage sur demande' },
  ],
  horairesSchema: [
    // Le week-end, dépannage sur demande uniquement : pas d'horaires d'ouverture déclarés à Google.
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
  ],
  disponibilite: 'Disponible 7j/7 · dépannage sur demande',

  // Qualifications et garanties affichées sur le site et transmises à Google.
  certifications: [
    { nom: 'Qualifelec', detail: 'Qualification professionnelle' },
    { nom: 'Label RGE', detail: 'Reconnu Garant de l’Environnement' },
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

  // Mentions légales (source : registre national des entreprises, SIREN 803 219 997).
  legal: {
    raisonSociale: 'AMCF',
    formeJuridique: 'SAS à associé unique (SASU) au capital de 1 500 €',
    dirigeant: 'Fabien Bonfils',
    qualiteDirigeant: 'Président',
    siege: '211 rue des États du Languedoc, 34160 Castries',
    siren: '803219997',
    siret: '803 219 997 00027',
    rcsOuRm: 'RCS Montpellier 803 219 997',
    tva: 'FR68 803 219 997',
    codeNaf: '4321A – Travaux d’installation électrique dans tous locaux',
    anneeCreation: 2014,
    // À COMPLÉTER : nom de l'assureur décennale, n° de contrat et zone couverte.
    // Tant que c'est vide, le site indique que ces informations figurent sur les devis et factures.
    assurance: '',
    // À COMPLÉTER : nom, adresse et site du médiateur de la consommation (obligatoire).
    mediateur: '',
  },

  // Formulaire de devis : clé d'accès Web3Forms (gratuite, à créer sur web3forms.com
  // avec l'adresse qui doit recevoir les demandes). Cette clé peut être publique.
  // Laisser vide pour utiliser les formulaires Netlify à la place.
  formulaire: {
    web3formsCle: 'f72a7ece-a96a-4d6c-80f2-6acf29eaf463',
  },

  // Codes de vérification fournis par Google Search Console et Bing Webmaster Tools
  // (méthode « balise HTML » : ne copier que la valeur de l'attribut content).
  verification: {
    google: '77P7jr3-JPi_DwO-j-vYOjOW-aTmmfgGBeeYNZrwbZY',
    bing: '6ED177457CF210F86EBE961DDB5116E2',
  },

  hebergeur: {
    nom: 'Netlify, Inc.',
    adresse: '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
    site: 'https://www.netlify.com',
  },
} as const;

export const telHref = `tel:${ENTREPRISE.telephoneLien}`;
