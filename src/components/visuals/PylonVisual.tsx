import { useId } from 'react';

/** Advertising tower with stacked light panels (cf. the Kärripojat pylon) and a lit wayfinding sign. */
export function PylonVisual({ lit }: { lit: boolean }) {
  const id = useId();
  const panels = [34, 82, 130, 178];
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={`vis vis-pylon ${lit ? 'is-lit' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#07080b" />
          <stop offset="1" stopColor="#0e1220" />
        </linearGradient>
        <linearGradient id={`${id}panel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#ffe8bf" />
        </linearGradient>
        <filter id={`${id}b`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}sky)`} />
      {/* ground */}
      <rect y="232" width="400" height="28" fill="#08090c" />
      <ellipse className="on" cx="232" cy="236" rx="120" ry="10" fill="#ffb352" opacity="0.25" filter={`url(#${id}b)`} />
      <rect className="on" x="196" y="24" width="72" height="200" fill="#ffad48" opacity="0.35" filter={`url(#${id}b)`} />

      {/* tower */}
      <rect x="194" y="22" width="76" height="210" rx="4" fill="#1c1e24" stroke="#3a3e47" strokeWidth="0.8" />
      {panels.map((y, p) => (
        <g key={y}>
          <rect x="201" y={y} width="62" height="40" rx="2" fill="#1a1d23" />
          <g className="on panel-lit" style={{ ['--p' as string]: p }}>
            <rect x="201" y={y} width="62" height="40" rx="2" fill={`url(#${id}panel)`} />
            <rect x="201" y={y} width="62" height="8" fill={p === 0 ? '#d23b2f' : p === 2 ? '#1f4fa0' : '#c9922f'} opacity="0.92" />
            <rect x="209" y={y + 16} width={p % 2 ? 38 : 46} height="5" rx="1" fill="#1a2134" opacity="0.75" />
            <rect x="209" y={y + 26} width={p % 2 ? 28 : 34} height="4" rx="1" fill="#1a2134" opacity="0.45" />
          </g>
        </g>
      ))}

      {/* wayfinding sign */}
      <rect x="96" y="150" width="4" height="82" fill="#22252c" />
      <rect x="62" y="132" width="78" height="30" rx="3" fill="#15171c" stroke="#3a3e47" strokeWidth="0.8" />
      <g className="on" style={{ transitionDelay: '420ms' }}>
        <rect x="62" y="132" width="78" height="30" rx="3" fill="#f2f4f8" />
        <path d="M74 147 h26 m-8 -7 l8 7 l-8 7" stroke="#1f4fa0" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="108" y="143" width="22" height="4" rx="1" fill="#1a2134" opacity="0.6" />
      </g>
    </svg>
  );
}
