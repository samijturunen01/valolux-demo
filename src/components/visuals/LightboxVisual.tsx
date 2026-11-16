import { useId } from 'react';

/**
 * Wall-mounted light box: aluminium frame, diffuser face with visible tube bands when lit.
 * Square canvas with the box centred, so it crops well into both wide and tall cards.
 */
export function LightboxVisual({ lit }: { lit: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={`vis vis-lightbox ${lit ? 'is-lit' : ''}`} aria-hidden="true">
      <defs>
        <pattern id={`${id}rib`} width="9" height="10" patternUnits="userSpaceOnUse">
          <rect width="9" height="10" fill="#0c0d11" />
          <rect width="1" height="10" fill="#1a1c22" />
          <rect x="5" width="2" height="10" fill="#08090b" />
        </pattern>
        <radialGradient id={`${id}wash`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb352" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb352" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}alu`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#555a64" />
          <stop offset="0.5" stopColor="#2a2d34" />
          <stop offset="1" stopColor="#17191d" />
        </linearGradient>
        <linearGradient id={`${id}face`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#ffe6b8" />
        </linearGradient>
        <filter id={`${id}blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="400" height="400" fill={`url(#${id}rib)`} />
      <ellipse className="on" cx="200" cy="200" rx="210" ry="170" fill={`url(#${id}wash)`} />
      <rect className="on" x="62" y="142" width="276" height="114" rx="14" fill="#ffad48" filter={`url(#${id}blur)`} opacity="0.5" />

      {/* brackets */}
      <rect x="104" y="132" width="9" height="16" rx="2" fill="#2a2d33" />
      <rect x="287" y="132" width="9" height="16" rx="2" fill="#2a2d33" />

      {/* frame + face */}
      <rect x="64" y="146" width="272" height="106" rx="10" fill={`url(#${id}alu)`} stroke="#5b606b" strokeWidth="0.8" />
      <rect x="72" y="154" width="256" height="90" rx="5" fill="#15171c" />
      <g className="on flicker">
        <rect x="72" y="154" width="256" height="90" rx="5" fill={`url(#${id}face)`} />
        {[169, 199, 229].map((y) => (
          <rect key={y} x="79" y={y - 4} width="242" height="8" rx="4" fill="#ffffff" opacity="0.55" filter={`url(#${id}soft)`} />
        ))}
      </g>
      <text
        x="200"
        y="209"
        textAnchor="middle"
        className="lb-text fill-t"
        style={{ font: '800 26px var(--font-sans)', fontStretch: '120%', letterSpacing: '0.06em' }}
      >
        VALOMAINOS
      </text>
      <rect x="72" y="154" width="256" height="2" fill="#fff" opacity="0.08" />

      {/* light pool on the pavement below */}
      <ellipse className="on" cx="200" cy="352" rx="150" ry="9" fill="#ffb352" opacity="0.2" filter={`url(#${id}soft)`} />
    </svg>
  );
}
