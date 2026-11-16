/**
 * How src/components/brand/logoPaths.ts was made (kept for reproducibility).
 *
 * Source: the gold "ValoLux" script on the company van, a frame inside the
 * valolux.net Flash header (source-assets/valolux-net/flash/pakettiauto.jpg).
 * Steps: crop → 8× Lanczos upscale → isolate gold pixels (R−B, R, G thresholds;
 * the white outline and navy paint drop out) → smooth the binary mask with a
 * blur + re-threshold (keeps hairlines, removes JPEG wobble) → potrace →
 * split contours into letters → normalise to a 928×245 unit space.
 *
 * Not a project dependency. To re-run:  npm i -D potrace && node scripts/tools/trace-logo.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const { default: potrace } = await import('potrace');

const SRC = join(root, 'source-assets/valolux-net/flash/pakettiauto.jpg');
const [L, T, W, H, S] = [30, 182, 520, 152, 8];

const { data, info } = await sharp(SRC).extract({ left: L, top: T, width: W, height: H })
  .resize(W * S, H * S, { kernel: 'lanczos3' }).blur(1.6).raw().toBuffer({ resolveWithObject: true });
const mask = Buffer.alloc(info.width * info.height);
for (let i = 0, j = 0; i < data.length; i += info.channels, j++) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  mask[j] = r - b > 44 && r > 100 && g > 64 ? 0 : 255;
}
const smooth = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
  .blur(6).extractChannel(0).raw().toBuffer();
for (let j = 0; j < smooth.length; j++) smooth[j] = smooth[j] < 140 ? 0 : 255;
const png = await sharp(smooth, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();

const tracer = new potrace.Potrace({ turdSize: 900, optTolerance: 0.6, alphaMax: 1, threshold: 128 });
const d = await new Promise((res, rej) => tracer.loadImage(png, (e) => (e ? rej(e) : res(tracer.getPathTag().match(/ d="([^"]+)"/)[1]))));
const subs = d.trim().split(/(?=M)/).map((s) => s.trim()).filter(Boolean);

// Contour order from potrace for this source: V=0, l=1, L=2, x=3, a=4(+7), u=5, o=6(+8)
const groups = [['V', [0]], ['a', [4, 7]], ['l', [1]], ['o', [6, 8]], ['L', [2]], ['u', [5]], ['x', [3]]];
const X0 = 133, Y0 = 190, K = 0.25; // bounding box origin of the letters, scale to 928 units wide
const fmt = (n) => String(Math.round(n * 10) / 10);
const norm = (s) => {
  let k = 0; // numbers alternate x, y
  return s.replace(/-?\d*\.?\d+/g, (n) => fmt((Number(n) - (k++ % 2 === 0 ? X0 : Y0)) * K)).replace(/\s*([A-Z])\s*/g, '$1');
};
const out = groups.map(([id, idx]) => ({ id, d: idx.map((i) => norm(subs[i])).join('') }));
writeFileSync(join(root, 'scripts/tools/logo-trace-output.json'), JSON.stringify(out, null, 1));
console.log('wrote scripts/tools/logo-trace-output.json – compare with logoPaths.ts before replacing it');
