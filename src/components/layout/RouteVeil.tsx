/**
 * Page transition: a dark veil with a line of light that switches on across the
 * screen, then fades to reveal the new page. Rendered with a new key on every
 * navigation (never on first load – the homepage has its own intro).
 */
export function RouteVeil() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-night-950 motion-reduce:hidden"
      style={{ animation: 'veil-fade 0.95s var(--ease-light) both' }}
    >
      <div
        className="h-px w-[min(70vw,56rem)] origin-center bg-[linear-gradient(90deg,transparent,var(--color-gold-200),transparent)] shadow-[0_0_24px_4px_rgb(255_180_80/0.45)]"
        style={{ animation: 'veil-line 0.75s var(--ease-expo) both' }}
      />
    </div>
  );
}
