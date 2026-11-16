import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { ScrollTrigger } from '../../lib/gsap';

/**
 * On navigation: scroll to top (or to the #hash target), move focus to the new
 * page's main heading for keyboard and screen-reader users, and refresh scroll
 * triggers once the new layout has settled. Pages are lazy-loaded, so hash
 * targets are polled for briefly until they exist.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const seek = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ block: 'start' });
          target.querySelector<HTMLElement>('[data-focus-target]')?.focus({ preventScroll: true });
        } else if (tries++ < 30) {
          later(seek, 60);
        }
      };
      later(seek, isFirst ? 120 : 40);
    } else if (!isFirst) {
      window.scrollTo(0, 0);
      let tries = 0;
      const focusTitle = () => {
        const heading = document.querySelector<HTMLElement>('#main [data-page-title]');
        if (heading) heading.focus({ preventScroll: true });
        else if (tries++ < 30) later(focusTitle, 60);
      };
      later(focusTitle, 40);
    }
    later(() => ScrollTrigger.refresh(), 600);

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname, hash]);

  return null;
}
