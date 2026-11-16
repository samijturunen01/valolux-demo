import { useId } from 'react';
import { LOGO_H, LOGO_LETTERS, LOGO_W } from './logoPaths';

type Props = {
  className?: string;
  /** Accessible name. Pass null when the mark sits next to visible brand text. */
  label?: string | null;
  tone?: 'lit' | 'dim';
};

/** Static, lit "ValoLux" script mark for header, footer and small placements. */
export function LogoMark({ className, label = 'Valolux', tone = 'lit' }: Props) {
  const id = useId();
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg viewBox={`-4 -4 ${LOGO_W + 8} ${LOGO_H + 8}`} className={className} {...a11y} focusable="false">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2={LOGO_H} gradientUnits="userSpaceOnUse">
          {tone === 'lit' ? (
            <>
              <stop offset="0" stopColor="#fff6e2" />
              <stop offset="0.4" stopColor="#f8dba0" />
              <stop offset="1" stopColor="#d6a04c" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#3a3a3c" />
              <stop offset="1" stopColor="#1b1c20" />
            </>
          )}
        </linearGradient>
      </defs>
      <g fill={`url(#${id}g)`} fillRule="evenodd">
        {LOGO_LETTERS.map((l) => (
          <path key={l.id} d={l.d} />
        ))}
      </g>
    </svg>
  );
}
