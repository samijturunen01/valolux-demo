import { useId } from 'react';

/** Shop window: the film graphic is squeegeed onto the glass and the interior lights up. */
export function FilmVisual({ lit }: { lit: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={`vis vis-film ${lit ? 'is-lit' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141820" />
          <stop offset="1" stopColor="#0a0c10" />
        </linearGradient>
        <radialGradient id={`${id}in`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff9e3d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}refl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#eef1f5" />
        </pattern>
        <clipPath id={`${id}win`}>
          <rect x="60" y="34" width="280" height="186" />
        </clipPath>
      </defs>
      <rect width="400" height="260" fill="#0b0c0f" />
      {/* frame */}
      <rect x="52" y="26" width="296" height="202" rx="3" fill="#22252c" />
      <g clipPath={`url(#${id}win)`}>
        <rect x="60" y="34" width="280" height="186" fill={`url(#${id}glass)`} />
        <rect className="on" x="60" y="34" width="280" height="186" fill={`url(#${id}in)`} style={{ transitionDelay: '600ms' }} />
        {/* interior shelf silhouettes */}
        <g fill="#05060a" opacity="0.65">
          <rect x="84" y="150" width="70" height="70" />
          <rect x="236" y="138" width="84" height="82" />
        </g>
        {/* the film graphic, revealed left → right */}
        <g className="film-reveal">
          <circle cx="122" cy="92" r="26" fill="none" stroke="#f3c879" strokeWidth="7" />
          <circle cx="122" cy="92" r="9" fill="#f3c879" />
          <rect x="164" y="74" width="138" height="14" rx="2" fill="#eef1f5" />
          <rect x="164" y="98" width="96" height="8" rx="2" fill="#eef1f5" opacity="0.8" />
          <rect x="60" y="186" width="280" height="34" fill={`url(#${id}dots)`} opacity="0.35" />
          <rect x="60" y="182" width="280" height="2" fill="#f3c879" />
        </g>
        <rect x="60" y="34" width="280" height="186" fill={`url(#${id}refl)`} transform="skewX(-22) translate(70 0)" />
        {/* squeegee light edge */}
        <rect className="squeegee" x="58" y="30" width="3" height="194" rx="1.5" fill="#fff6df" style={{ ['--sq' as string]: '280px' }} />
      </g>
      <rect x="196" y="26" width="8" height="202" fill="#22252c" />
      <rect y="228" width="400" height="32" fill="#08090b" />
    </svg>
  );
}
