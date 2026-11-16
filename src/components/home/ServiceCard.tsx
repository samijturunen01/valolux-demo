import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../../content/services';
import { ServiceVisual } from '../visuals/ServiceVisual';
import { usePointerGlow } from '../../hooks/usePointerGlow';
import { useInView } from '../../hooks/useInView';
import { useFinePointer } from '../../hooks/useMediaQuery';

type Props = { service: Service; className?: string; visualClassName?: string; delay?: number };

/**
 * A service as a physical light object: hover or focus switches its visual on.
 * On touch screens the visual powers on while the card is in the middle of the viewport.
 */
export function ServiceCard({ service, className = '', visualClassName = 'aspect-[16/10]', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const [active, setActive] = useState(false);
  const centred = useInView(ref, { threshold: 0.6, rootMargin: '-15% 0px -15% 0px', once: false });
  const lit = active || (!fine && centred);
  usePointerGlow(ref);

  return (
    <article
      ref={ref}
      className={`glow-card group flex flex-col overflow-hidden ${lit ? 'is-lit' : ''} ${className}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      data-reveal
      style={{ ['--d' as string]: delay }}
    >
      <div className={`relative overflow-hidden rounded-t-[1.4rem] ${visualClassName}`}>
        <ServiceVisual kind={service.visual} lit={lit} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-850 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-5 sm:p-8 sm:pt-6">
        <div className="flex items-center gap-3">
          <span className={`led ${lit ? 'is-on' : ''}`} aria-hidden="true" />
          <span className="num t-label">{service.number}</span>
        </div>
        <h3 className="t-h3 mt-3">
          <Link to={`/palvelut#${service.id}`} className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[1.4rem] focus-visible:after:outline-2 focus-visible:after:outline-gold-300">
            {service.title}
          </Link>
        </h3>
        <p className="t-body mt-3 max-w-[38ch] text-[0.98rem]">{service.short}</p>
        <span className="link-light mt-auto self-start pt-6 text-[0.92rem]" aria-hidden="true">
          Lue lisää
          <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
