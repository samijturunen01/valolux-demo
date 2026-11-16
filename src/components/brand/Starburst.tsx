import { useId } from 'react';

/** Eight-ray star, a modern take on the starburst painted above "VALOA YÖHÖN" on the company van. */
const rays = (() => {
  const pts: string[] = [];
  for (let k = 0; k < 16; k++) {
    const a = (k * Math.PI) / 8 - Math.PI / 2;
    const r = k % 2 === 1 ? 4.2 : k % 4 === 0 ? 50 : 26;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(' ');
})();

export function Starburst({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}c`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.25" stopColor="#fff2d4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb84d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill={`url(#${id}c)`} opacity="0.55" />
      <polygon points={rays} fill="#fffaf0" />
      <circle cx="50" cy="50" r="5" fill="#fff" />
    </svg>
  );
}
