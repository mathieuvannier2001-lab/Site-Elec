/**
 * Plugin Netlify « IndexNow »
 * Après chaque mise en ligne, prévient Bing (et les autres moteurs IndexNow)
 * des pages nouvelles ou modifiées. Ne bloque jamais la mise en ligne.
 *
 * Fonctionnement :
 *  1. après la construction, calcule une empreinte de chaque page du sitemap ;
 *  2. compare avec les empreintes de la mise en ligne précédente (cache Netlify) ;
 *  3. une fois le site en ligne, envoie la liste des pages changées à IndexNow.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const HOTE = 'www.amcf-electricien.fr';
const CLE = '3f13b3cd35803f428d718dff0e36a920'; // doit correspondre au fichier public/<clé>.txt
const DOSSIER_CACHE = '.indexnow';
const FICHIER_EMPREINTES = join(DOSSIER_CACHE, 'empreintes.json');

let aEnvoyer = [];

/** Liste les URL de tous les sitemaps (sitemap-0.xml, sitemap-1.xml…). */
function urlsDuSitemap(dossierPublie) {
  return readdirSync(dossierPublie)
    .filter((f) => /^sitemap-\d+\.xml$/.test(f))
    .flatMap((f) => [...readFileSync(join(dossierPublie, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

/** Fichier HTML correspondant à une URL (format « dossier/index.html »). */
function fichierDeUrl(dossierPublie, url) {
  const chemin = decodeURI(new URL(url).pathname);
  return join(dossierPublie, chemin, 'index.html');
}

/** Compare les empreintes actuelles aux précédentes et renvoie les URL changées. */
function calculerChangements(dossierPublie, anciennes) {
  const nouvelles = {};
  const changees = [];
  for (const url of urlsDuSitemap(dossierPublie)) {
    const fichier = fichierDeUrl(dossierPublie, url);
    if (!existsSync(fichier)) continue;
    const empreinte = createHash('sha1').update(readFileSync(fichier)).digest('hex');
    nouvelles[url] = empreinte;
    if (anciennes[url] !== empreinte) changees.push(url);
  }
  return { nouvelles, changees };
}

export const onPostBuild = async ({ constants, utils }) => {
  try {
    await utils.cache.restore(DOSSIER_CACHE);
    const anciennes = existsSync(FICHIER_EMPREINTES) ? JSON.parse(readFileSync(FICHIER_EMPREINTES, 'utf8')) : {};
    const { nouvelles, changees } = calculerChangements(resolve(constants.PUBLISH_DIR), anciennes);
    mkdirSync(DOSSIER_CACHE, { recursive: true });
    writeFileSync(FICHIER_EMPREINTES, JSON.stringify(nouvelles));
    aEnvoyer = changees;
    console.log(`IndexNow : ${changees.length} page(s) nouvelle(s) ou modifiée(s) sur ${Object.keys(nouvelles).length}.`);
  } catch (e) {
    console.log('IndexNow : calcul des changements impossible —', e.message);
    aEnvoyer = [];
  }
};

export const onSuccess = async ({ utils }) => {
  // Ne prévenir les moteurs que pour le vrai site, et seulement une fois en ligne.
  if (process.env.CONTEXT !== 'production') return;
  if (aEnvoyer.length === 0) {
    console.log('IndexNow : aucune page à signaler.');
    await utils.cache.save(DOSSIER_CACHE);
    return;
  }
  try {
    const reponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOTE,
        key: CLE,
        keyLocation: `https://${HOTE}/${CLE}.txt`,
        urlList: aEnvoyer.slice(0, 10000),
      }),
    });
    if (reponse.ok) {
      console.log(`IndexNow : ${aEnvoyer.length} page(s) signalée(s) (réponse ${reponse.status}).`);
      // On ne mémorise les empreintes que si l'envoi a réussi, pour réessayer sinon.
      await utils.cache.save(DOSSIER_CACHE);
    } else {
      console.log(`IndexNow : envoi refusé (réponse ${reponse.status}) — nouvel essai à la prochaine mise en ligne.`);
    }
  } catch (e) {
    console.log('IndexNow : envoi impossible —', e.message);
  }
};
