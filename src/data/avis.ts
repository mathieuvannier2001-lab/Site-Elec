/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AVIS CLIENTS (page /avis/)
 *  Recopier ici les avis publiés sur la fiche Google, sans les modifier.
 *  Ne jamais ajouter d'avis inventé : uniquement de vrais avis Google.
 *  Le plus récent en premier. Mettre aussi à jour la note et le nombre d'avis
 *  affichés sur la fiche Google (null tant qu'il n'y a pas d'avis).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { ENTREPRISE } from './entreprise';

export const AVIS_GOOGLE = {
  /** Lien direct vers le formulaire d'avis Google. */
  lienAvis: ENTREPRISE.avisGoogle,
  /** Lien vers la fiche Google (pour lire tous les avis). */
  lienFiche: ENTREPRISE.reseaux.google,
  /** Note moyenne affichée sur Google, ex. 4.9 */
  note: null as number | null,
  /** Nombre total d'avis sur Google, ex. 12 */
  total: null as number | null,
};

export type Avis = {
  /** Prénom et initiale, comme affiché sur Google (ex. « Sophie M. »). */
  auteur: string;
  /** Note de 1 à 5. */
  note: 1 | 2 | 3 | 4 | 5;
  /** Date de l'avis, format AAAA-MM-JJ. */
  date: string;
  /** Texte de l'avis, recopié tel quel. */
  texte: string;
  /** Réponse de Fabien publiée sur Google (facultatif). */
  reponse?: string;
};

export const AVIS: Avis[] = [];
