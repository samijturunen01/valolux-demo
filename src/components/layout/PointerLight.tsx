import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * A faint warm light that follows the pointer on desktop, as if the visitor were
 * carrying a lamp through the dark page. Moved with transforms only.
 */
export function PointerLight() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced || !el.current) return;
    const node = el.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    let running = false;

    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      node.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      if (Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      node.style.opacity = '1';
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => (node.style.opacity = '0');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;
  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] size-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700 will-change-transform"
      style={{ background: 'radial-gradient(closest-side, rgb(255 190 120 / 0.055), rgb(255 160 80 / 0.02) 55%, transparent)' }}
    />
  );
}
