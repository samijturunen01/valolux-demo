import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';

/** 5×7 dot-matrix glyphs (rows top→bottom) for the characters the display needs. */
const FONT: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  Ä: ['01010', '00000', '01110', '10001', '11111', '10001', '10001'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  Ö: ['01010', '00000', '01110', '10001', '10001', '10001', '01110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  '-': ['000', '000', '000', '111', '000', '000', '000'],
  ' ': ['000', '000', '000', '000', '000', '000', '000'],
  '*': ['00100', '00100', '01110', '11111', '01110', '00100', '00100'],
};
const MESSAGE = 'VALOA YÖHÖN * LED-NÄYTÖT * ';
const ROWS = 9; // 7 glyph rows + 1 margin above and below
const COLS = 60;

/** Columns of on/off bits for the whole message */
const STRIP: number[][] = (() => {
  const cols: number[][] = [];
  for (const ch of MESSAGE) {
    const g = FONT[ch] ?? FONT[' '];
    for (let c = 0; c < g[0].length; c++) cols.push(g.map((row) => (row[c] === '1' ? 1 : 0)));
    cols.push([0, 0, 0, 0, 0, 0, 0]);
  }
  return cols;
})();

function sprite(size: number, lit: boolean) {
  const c = document.createElement('canvas');
  c.width = c.height = Math.ceil(size * 3);
  const g = c.getContext('2d')!;
  const m = size * 1.5;
  if (lit) {
    const halo = g.createRadialGradient(m, m, 0, m, m, size * 1.5);
    halo.addColorStop(0, 'rgba(255,176,60,0.55)');
    halo.addColorStop(1, 'rgba(255,140,30,0)');
    g.fillStyle = halo;
    g.fillRect(0, 0, c.width, c.height);
  }
  const core = g.createRadialGradient(m - size * 0.12, m - size * 0.12, 0, m, m, size * 0.5);
  core.addColorStop(0, lit ? '#fff3cf' : '#2a2620');
  core.addColorStop(0.55, lit ? '#ffb53f' : '#1d1a16');
  core.addColorStop(1, lit ? '#e07c12' : '#141210');
  g.fillStyle = core;
  g.beginPath();
  g.arc(m, m, size * 0.42, 0, Math.PI * 2);
  g.fill();
  return c;
}

/**
 * Amber LED display (Valolux lists yellow, red and orange display colours) scrolling
 * the company slogan. The render loop only runs while the display is visible and
 * powered (or still fading out).
 */
export function LedMatrixVisual({ lit }: { lit: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const litRef = useRef(lit);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    litRef.current = lit;
    kick.current();
  }, [lit]);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = prefersReducedMotion();
    let pitch = 0;
    let on: HTMLCanvasElement | null = null;
    let off: HTMLCanvasElement | null = null;
    let offset = 0;
    let level = 0; // 0 → 1 power ramp
    let raf = 0;
    let running = false;
    let last = 0;
    let visible = false;

    const draw = () => {
      if (!on || !off) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      const start = Math.floor(offset);
      for (let x = 0; x < COLS; x++) {
        const col = STRIP[(start + x) % STRIP.length];
        for (let y = 0; y < ROWS; y++) {
          const bit = y > 0 && y < 8 ? col[y - 1] : 0;
          const px = x * pitch - pitch;
          const py = y * pitch - pitch;
          ctx.globalAlpha = 1;
          ctx.drawImage(off, px, py);
          if (bit && level > 0) {
            ctx.globalAlpha = level;
            ctx.drawImage(on, px, py);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      const target = litRef.current ? 1 : 0;
      if (!visible || (target === 0 && level === 0)) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
      if (t - last < 55) return; // ~18 fps suits a stepping LED display
      last = t;
      level += Math.sign(target - level) * Math.min(0.2, Math.abs(target - level));
      if (target && !reduced) offset = (offset + 1) % STRIP.length;
      draw();
      if (reduced && level === target) {
        cancelAnimationFrame(raf);
        running = false;
      }
    };

    kick.current = () => {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth;
      if (!w) return;
      pitch = (w * dpr) / COLS;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(pitch * ROWS);
      on = sprite(pitch, true);
      off = sprite(pitch, false);
      draw();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick.current();
    });
    io.observe(cv);
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      kick.current = () => {};
    };
  }, []);

  return (
    <div className="led-matrix grid place-items-center bg-[#0b0c0f] px-[7%]" aria-hidden="true">
      <div className="w-full rounded-xl bg-[#060607] p-[3%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_20px_50px_-20px_rgb(0_0_0/0.9)] ring-1 ring-black">
        <canvas ref={canvas} className="block w-full" style={{ aspectRatio: `${COLS} / ${ROWS}` }} />
      </div>
    </div>
  );
}
