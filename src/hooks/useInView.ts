import { useEffect, useState, type RefObject } from 'react';

type Options = { threshold?: number; rootMargin?: string; once?: boolean };

/** True while (or once, with `once`) the element intersects the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.2, rootMargin = '0px 0px -8% 0px', once = true }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
