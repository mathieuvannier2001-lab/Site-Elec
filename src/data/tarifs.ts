/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GRILLE DE TARIFS (page /tarifs/)
 *  Tous les montants sont en euros TTC.
 *
 *  1. DÉPANNAGE : la réglementation (arrêté du 24 janvier 2017) demande d'afficher
 *     le taux horaire, les frais de déplacement et le mode de décompte du temps.
 *     Tant qu'une valeur vaut null, la page affiche « annoncé au téléphone ».
 *     → Fabien : remplacer chaque null par son vrai prix.
 *
 *  2. TRAVAUX : fourchettes indicatives (prix habituellement constatés), à vérifier
 *     et ajuster par Fabien. Mettre null en min et max pour afficher « sur devis ».
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MISE_A_JOUR_TARIFS = '2026-10-16';

export const DEPANNAGE = {
  /** Forfait déplacement + première heure de diagnostic, en semaine (€ TTC). */
  forfaitPremiereHeure: null as number | null,
  /** Heure de main-d'œuvre au-delà de la première heure (€ TTC). */
  tauxHoraire: null as number | null,
  /** Mode de décompte du temps au-delà de la première heure. */
  decompteTemps: null as string | null, // ex. 'par demi-heure'
  /** Majoration soirs, week-ends et jours fériés. */
  majoration: null as string | null, // ex. '+50 %'
};

export type Ligne = {
  nom: string;
  min: number | null;
  max: number | null;
  unite?: string;
  note?: string;
};

export type Groupe = {
  titre: string;
  service: string;
  lignes: Ligne[];
};

export const GRILLE: Groupe[] = [
  {
    titre: 'Petits dépannages',
    service: 'depannage-electrique',
    lignes: [
      { nom: 'Remplacement d’une prise ou d’un interrupteur', min: 60, max: 150, note: 'déplacement compris' },
      { nom: 'Remplacement d’un disjoncteur', min: 80, max: 200 },
      { nom: 'Remplacement d’un interrupteur différentiel 30 mA', min: 150, max: 350 },
      { nom: 'Recherche de panne avec mesure d’isolement', min: null, max: null },
    ],
  },
  {
    titre: 'Tableau électrique',
    service: 'tableau-electrique',
    lignes: [
      { nom: 'Mise en sécurité partielle (différentiel 30 mA, disjoncteurs)', min: 300, max: 1000 },
      { nom: 'Parafoudre, fourni et posé', min: 200, max: 450 },
      { nom: 'Remplacement du tableau d’un appartement', min: 700, max: 1500 },
      { nom: 'Remplacement du tableau d’une maison', min: 900, max: 2500 },
    ],
  },
  {
    titre: 'Mise aux normes et rénovation',
    service: 'mise-aux-normes-electriques',
    lignes: [
      { nom: 'Ajout d’une prise ou d’un point lumineux', min: 90, max: 250, unite: 'par point' },
      { nom: 'Circuit dédié (climatisation, plaque de cuisson, four…)', min: 250, max: 600 },
      { nom: 'Mise en sécurité d’un logement', min: 50, max: 80, unite: 'le m²' },
      { nom: 'Rénovation électrique complète', min: 110, max: 160, unite: 'le m²' },
    ],
  },
  {
    titre: 'Borne de recharge',
    service: 'borne-recharge-vehicule-electrique',
    lignes: [
      { nom: 'Prise renforcée (type Green’Up), fournie et posée', min: 400, max: 800 },
      { nom: 'Borne de recharge 7 kW, fournie et posée', min: 1000, max: 2000 },
      { nom: 'Borne en copropriété', min: null, max: null },
    ],
  },
  {
    titre: 'Portail, volets et porte de garage',
    service: 'automatismes-portail-volets',
    lignes: [
      { nom: 'Motorisation d’un volet roulant existant', min: 300, max: 650, unite: 'par volet' },
      { nom: 'Motorisation de portail battant, fournie et posée', min: 900, max: 2200 },
      { nom: 'Motorisation de portail coulissant, fournie et posée', min: 1000, max: 2500 },
    ],
  },
  {
    titre: 'Éclairage et courant faible',
    service: 'courant-faible',
    lignes: [
      { nom: 'Pose d’un luminaire que vous fournissez', min: 50, max: 120, unite: 'par point' },
      { nom: 'Spot LED encastré, fourni et posé', min: 60, max: 120, unite: 'par spot' },
      { nom: 'Prise réseau RJ45', min: 90, max: 180, unite: 'par prise' },
      { nom: 'Visiophone, fourni et posé', min: 400, max: 1000 },
    ],
  },
  {
    titre: 'Professionnels',
    service: 'maintenance-electrique-professionnels',
    lignes: [
      { nom: 'Contrat de maintenance', min: null, max: null },
      { nom: 'Levée des réserves après vérification périodique', min: null, max: null },
    ],
  },
];
