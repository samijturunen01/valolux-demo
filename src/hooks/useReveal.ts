import { useEffect, type RefObject } from 'react';

/**
 * Marks every `[data-reveal]`, `.mask-line` and `[data-watch]` element inside
 * `scope` with a `data-in` attribute as it enters the viewport; CSS does the rest.
 * An attribute (not a class) is used so React re-renders that rewrite
 * `className` never undo the reveal.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal], .mask-line, [data-watch]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-in', '');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [scope, ...deps]);
}
