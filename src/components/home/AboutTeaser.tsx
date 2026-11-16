import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import { useReveal } from '../../hooks/useReveal';
import { Eyebrow } from '../ui/Eyebrow';
import { LitImage } from '../ui/LitImage';
import { media } from '../../assets/media';
import { company } from '../../content/company';

export function AboutTeaser() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-year]',
        { yPercent: 18 },
        { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-y relative overflow-hidden" aria-labelledby="about-title">
      <p
        data-year
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6vw] bottom-[-6%] text-[clamp(9rem,26vw,26rem)] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgb(238_199_124/0.1)] [font-stretch:115%]"
      >
        {company.founded}
      </p>
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-6" data-reveal>
          <LitImage
            asset={media.pakettiauto}
            alt="Valoluxin pakettiauton kylki: tähti, teksti VALOA YÖHÖN, kultainen ValoLux-logo ja sana VALOMAINOSPALVELU."
            className="rounded-2xl"
          />
          <figcaption className="mt-3 text-[0.8rem] text-steel-300">Valoluxin pakettiauto – ”Valoa yöhön”.</figcaption>
        </figure>
        <div className="lg:col-span-5 lg:col-start-8">
          <Eyebrow>Yritys</Eyebrow>
          <h2 id="about-title" className="t-h2 mt-8">
            <span className="mask-line">
              <span>Valoa yöhön</span>
            </span>
            <span className="mask-line">
              <span className="t-serif" style={{ ['--d' as string]: 120 }}>
                vuodesta {company.founded}.
              </span>
            </span>
          </h2>
          <p className="t-body mt-8" data-reveal>
            Valomainospalvelu Valolux on perustettu helmikuussa {company.founded}. Toimipisteemme sijaitsee Joensuun
            teollisuusalueella Paukkajantiellä, ja erikoisalaamme ovat valomainokset ulko- ja sisäkäyttöön.
          </p>
          <p className="t-body mt-4" data-reveal>
            Toteutuksiamme löytyy muun muassa Joensuusta, Outokummusta, Pankakoskelta ja Tikkakoskelta.
          </p>
          <Link to="/yritys" className="link-light mt-8" data-reveal>
            Tutustu yritykseen <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
