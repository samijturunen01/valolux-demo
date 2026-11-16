import type { ReactNode } from 'react';

/** Section label whose LED powers on when the section scrolls into view (needs useReveal on the page). */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`t-eyebrow ${className}`} data-watch="">
      <span className="led led-auto" aria-hidden="true" />
      {children}
    </p>
  );
}
