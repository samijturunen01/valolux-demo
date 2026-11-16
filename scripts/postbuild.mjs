/**
 * Post-build step for static hosting (GitHub Pages):
 *  - writes dist/<route>/index.html for every route, each with its own <title>,
 *    description and Open Graph tags, so deep links load with status 200 and
 *    correct metadata before JavaScript runs;
 *  - writes dist/404.html (GitHub Pages serves it for unknown paths; the SPA
 *    then renders its own 404 view);
 *  - keeps the demo out of search engines unless ALLOW_INDEXING=true;
 *  - writes sitemap.xml + canonical/og:url when SITE_URL is given.
 *
 * Env: BASE_PATH (same as for vite build), SITE_URL, ALLOW_INDEXING
 * Requires Node ≥ 22.18 (imports a .ts data module).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { notFoundMeta, pageMeta } from '../src/content/seo.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const base = process.env.BASE_PATH ?? '/';
const siteUrl = process.env.SITE_URL?.replace(/\/$/, '');
const allowIndexing = process.env.ALLOW_INDEXING === 'true';

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// GitHub Pages serves dist/<route>/index.html at "<route>/", so canonical URLs end with a slash
const pageUrl = (path) => siteUrl + (path === '/' ? '/' : `${path}/`);

function render(meta) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`);
  if (siteUrl) {
    const url = pageUrl(meta.path);
    html = html
      .replace('</head>', `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`)
      .replace(/(<meta\s+property="og:image"\s+content=")([^"]*)(")/, (_, a, img, b) => a + (img.startsWith('http') ? img : siteUrl + img.replace(base, '/')) + b);
  }
  if (allowIndexing) html = html.replace(/\s*<meta name="robots"[^>]*data-demo-robots[^>]*>/, '');
  return html;
}

for (const meta of pageMeta) {
  const out = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(meta));
}
writeFileSync(join(dist, '404.html'), render(notFoundMeta));

writeFileSync(
  join(dist, 'robots.txt'),
  allowIndexing ? `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}` : 'User-agent: *\nDisallow: /\n',
);
if (siteUrl) {
  const urls = pageMeta.map((m) => `  <url><loc>${pageUrl(m.path)}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
// GitHub Pages: serve files as-is (no Jekyll processing)
writeFileSync(join(dist, '.nojekyll'), '');

console.log(`postbuild: ${pageMeta.length} routes + 404.html (indexing ${allowIndexing ? 'ON' : 'OFF'})`);
