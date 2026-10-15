/**
 * Génère les icônes (favicon, raccourcis mobiles) et l'image de partage
 * Open Graph à partir du logo vectoriel.
 * Utilisation : node scripts/generer-images.mjs   (nécessite Playwright pour l'image de partage)
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const fav = await readFile('public/favicon.svg');
await sharp(fav, { density: 1200 }).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(fav, { density: 1200 }).resize(180, 180).flatten({ background: '#0c0d10' }).png().toFile('public/apple-touch-icon.png');
await sharp(fav, { density: 1200 }).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(fav, { density: 1200 }).resize(512, 512).png().toFile('public/icon-512.png');

const logo = await readFile('public/logo-amcf.svg');
await sharp(logo, { density: 1200 })
  .resize(420)
  .extend({ top: 60, bottom: 60, left: 46, right: 46, background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/logo-amcf.png');

let chromium;
try {
  // require() respecte NODE_PATH : Playwright peut être installé globalement.
  ({ chromium } = createRequire(import.meta.url)('playwright'));
} catch {
  console.log('Playwright absent : image de partage non régénérée.');
  process.exit(0);
}
const font = (await readFile('public/fonts/archivo-var.woff2')).toString('base64');
const mono = logo.toString().replace('stroke="#D22E24"', 'stroke="#ff4a3d"');
const html = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 800;font-stretch:100% 125%}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:A;color:#fff;background:#0c0d10;position:relative;overflow:hidden}
.bg{position:absolute;inset:0;background:radial-gradient(700px 500px at 88% 30%,rgba(210,46,36,.45),transparent 70%),linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px) 0 0/48px 48px}
.wrap{position:relative;padding:72px 80px;height:100%;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:22px}
.brand svg{width:96px;height:auto}
.brand b{font-size:40px;font-stretch:125%;letter-spacing:.04em}
.brand small{display:block;font-size:17px;color:#a4a7af;letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-stretch:115%}
h1{margin-top:auto;font-size:76px;line-height:1;font-stretch:116%;font-weight:780;letter-spacing:-.03em}
h1 span{color:#ff5245}
p{margin-top:24px;font-size:28px;color:#c9c8c4;font-weight:500}
.tel{position:absolute;right:80px;bottom:72px;display:flex;align-items:center;gap:14px;padding:18px 28px;border-radius:999px;background:#d22e24;font-size:32px;font-weight:800;font-stretch:112%}
</style></head><body><div class="bg"></div><div class="wrap">
<div class="brand">${mono}<div><b>AMCF</b><small>Automatisme · Maintenance · Courant fort &amp; faible</small></div></div>
<h1>Électricien à <span>Castries</span><br>&amp; Montpellier</h1>
<p>Dépannage 7j/7 sur demande · Devis gratuit</p>
</div><div class="tel">06 65 95 33 04</div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.waitForTimeout(300);
await page.screenshot({ path: 'public/og/amcf-electricien-castries.png' });
await browser.close();
console.log('Images générées.');
