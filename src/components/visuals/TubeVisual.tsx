import { useId } from 'react';

/**
 * Service diagram of a light box: fluorescent tube, starter and ballast – the parts
 * Valolux lists for routine service. The failing tube's ends glow until serviced.
 */
export function TubeVisual({ lit }: { lit: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={`vis vis-tube ${lit ? 'is-lit' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#30333b" />
          <stop offset="1" stopColor="#17191e" />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2ecff" />
        </linearGradient>
        <filter id={`${id}b`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={`${id}s`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="400" height="260" fill="#0b0c0f" />
      <rect className="on" x="40" y="86" width="320" height="60" rx="30" fill="#cfe0ff" opacity="0.35" filter={`url(#${id}b)`} />

      {/* housing */}
      <rect x="34" y="64" width="332" height="104" rx="8" fill={`url(#${id}h)`} stroke="#454953" strokeWidth="0.8" />
      {/* ballast + starter */}
      <rect x="150" y="136" width="70" height="20" rx="2" fill="#0f1013" stroke="#3a3e47" strokeWidth="0.8" />
      <rect x="252" y="134" width="16" height="22" rx="7" fill="#9a6b2d" opacity="0.8" />
      {/* lamp holders */}
      <rect x="52" y="96" width="14" height="30" rx="2" fill="#0c0d10" />
      <rect x="334" y="96" width="14" height="30" rx="2" fill="#0c0d10" />

      {/* tube: dead glass, dying ends, lit */}
      <rect x="64" y="103" width="272" height="16" rx="8" fill="#3a3d45" />
      <rect x="64" y="103" width="272" height="3" rx="1.5" fill="#fff" opacity="0.08" />
      <g className="tube-ends">
        <ellipse cx="74" cy="111" rx="10" ry="7" fill="#ff8a3d" filter={`url(#${id}s)`} />
        <ellipse cx="326" cy="111" rx="10" ry="7" fill="#ff8a3d" filter={`url(#${id}s)`} />
      </g>
      <g className="on flicker">
        <rect x="64" y="103" width="272" height="16" rx="8" fill={`url(#${id}t)`} />
        <rect x="64" y="100" width="272" height="22" rx="11" fill="#ffffff" opacity="0.4" filter={`url(#${id}s)`} />
      </g>

      {/* annotations */}
      <g fill="none" stroke="#6f7583" strokeWidth="0.8">
        <path d="M200 103 V44 H226" />
        <path d="M185 156 V212 H160" />
        <path d="M260 156 V196 H286" />
      </g>
      <g style={{ font: '500 11px var(--font-sans)', letterSpacing: '0.08em' }} fill="#9aa0ac">
        <text x="232" y="48">LOISTEPUTKI</text>
        <text x="154" y="216" textAnchor="end">
          KURISTIN
        </text>
        <text x="292" y="200">SYTYTIN</text>
      </g>
    </svg>
  );
}
