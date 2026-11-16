/**
 * Generates favicon.svg, apple-touch-icon.png and og-image.jpg into /public from
 * the traced logo paths. Requires Node ≥ 22.18 (imports a .ts data module).
 *
 * Run: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOGO_H, LOGO_LETTERS, LOGO_W } from '../src/components/brand/logoPaths.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => join(root, 'public', f);

const gold = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="${LOGO_H}" gradientUnits="userSpaceOnUse">
  <stop offset="0" stop-color="#fff6e2"/><stop offset=".4" stop-color="#f8dba0"/><stop offset="1" stop-color="#d6a04c"/></linearGradient>`;

// Favicon: the swash "V" in gold on night
const V = LOGO_LETTERS[0];
const s = 44 / V.box[2];
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs>${gold.replace('y2="' + LOGO_H + '"', 'y2="' + V.box[3] + '"')}</defs>
<rect width="64" height="64" rx="14" fill="#07080b"/>
<g transform="translate(${(64 - V.box[2] * s) / 2} ${(64 - V.box[3] * s) / 2}) scale(${s.toFixed(4)})"><path d="${V.d}" fill="url(#g)" fill-rule="evenodd"/></g>
</svg>`;
writeFileSync(pub('favicon.svg'), favicon);
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));

// Open Graph image: the lit sign on a dark wall
const W = 1200, H = 630, k = 820 / LOGO_W;
const ox = (W - LOGO_W * k) / 2, oy = 250;
const letters = LOGO_LETTERS.map((l) => `<path d="${l.d}" fill-rule="evenodd"/>`).join('');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${gold}
  <radialGradient id="spill" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#ffaa46" stop-opacity=".32"/><stop offset=".5" stop-color="#ff8c2d" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <filter id="halo" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="bloom" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="#050608"/>
<rect width="${W}" height="${H}" fill="url(#spill)"/>
<g transform="translate(${ox} ${oy}) scale(${k})">
  <g fill="#ff9d33" filter="url(#halo)" opacity=".9">${letters}</g>
  <g fill="#020203" transform="translate(0 6)">${letters}</g>
  <g fill="url(#g)">${letters}</g>
  <g fill="#ffdc9c" filter="url(#bloom)" opacity=".55">${letters}</g>
</g>
<text x="${W / 2}" y="200" text-anchor="middle" fill="#fff0cf" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" letter-spacing="13">VALOMAINOSPALVELU</text>
<text x="${W / 2}" y="560" text-anchor="middle" fill="#9aa0ac" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="6">JOENSUU · VUODESTA 2000</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile(pub('og-image.jpg'));
console.log('brand assets → public/');
