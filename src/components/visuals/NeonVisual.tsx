import { useId } from 'react';

/**
 * "AUKI" neon in red tubes inside a blue border tube – after the AUKI/OPEN neon
 * shown on Valolux's own service page. Single-stroke paths = real tube runs.
 */
const LETTERS = [
  'M86 166 L112 86 L138 166 M96 138 L128 138', // A
  'M160 86 L160 140 Q160 166 186 166 Q212 166 212 140 L212 86', // U
  'M236 86 L236 166 M280 86 L240 128 M254 112 L284 166', // K
  'M310 86 L310 166', // I
];
const BORDER = 'M62 52 H338 Q356 52 356 70 V182 Q356 200 338 200 H62 Q44 200 44 182 V70 Q44 52 62 52 Z';

export function NeonVisual({ lit }: { lit: boolean }) {
  const id = useId();
  const tube = (d: string, i: number, color: string, glow: string, core: string, delay: number) => (
    <g key={i}>
      <path d={d} className="off" stroke="#2b2e36" strokeWidth="7" />
      <path d={d} className="off" stroke="#4a4e59" strokeWidth="1.2" transform="translate(-1 -1.5)" />
      <g className="on flicker" style={{ ['--fd' as string]: delay }}>
        <path d={d} stroke={glow} strokeWidth="16" opacity="0.55" filter={`url(#${id}g)`} />
        <path d={d} stroke={color} strokeWidth="6.5" />
        <path d={d} stroke={core} strokeWidth="2.2" />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={`vis vis-neon ${lit ? 'is-lit' : ''}`} aria-hidden="true">
      <defs>
        <filter id={`${id}g`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <radialGradient id={`${id}w`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff4b3a" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#4f7dff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0b0c0f" />
      <ellipse className="on" cx="200" cy="126" rx="250" ry="170" fill={`url(#${id}w)`} />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {tube(BORDER, 9, '#5b93ff', '#3d6dff', '#e6efff', 0)}
        {LETTERS.map((d, i) => tube(d, i, '#ff5a46', '#ff2a1a', '#ffe3dc', 160 + i * 110))}
      </g>
      {/* mounting standoffs */}
      {[
        [70, 60],
        [330, 60],
        [70, 192],
        [330, 192],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#3a3d45" />
      ))}
    </svg>
  );
}
