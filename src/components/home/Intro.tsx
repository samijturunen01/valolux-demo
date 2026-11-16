import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import { useReveal } from '../../hooks/useReveal';
import { Eyebrow } from '../ui/Eyebrow';
import { LitImage } from '../ui/LitImage';
import { media } from '../../assets/media';
import { company } from '../../content/company';
import { coreActivities } from '../../content/services';

/** Words of the statement; `glow` lights up gold, `fade` stays in the dark on purpose. */
const STATEMENT: { w: string; glow?: boolean; fade?: boolean }[] = [
  ...'Kun ilta pimenee, kaupunkikuva jakautuu kahtia: yrityksiin, jotka'.split(' ').map((w) => ({ w })),
  { w: 'näkyvät', glow: true },
  { w: '–' },
  { w: 'ja' },
  { w: 'niihin,' },
  { w: 'jotka' },
  { w: 'katoavat.', fade: true },
];

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const statement = useRef<HTMLHeadingElement>(null);
  useReveal(root);

  // Scroll-linked: the statement's words switch on as the visitor reads down.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-w]');
      gsap.set(words, { opacity: 0.12 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: statement.current, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 },
      });
      words.forEach((el, i) => {
        tl.to(el, { opacity: el.dataset.w === 'fade' ? 0.24 : 1, duration: 1, ease: 'none' }, i * 0.55);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="esittely" className="section-y relative scroll-mt-0">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <Eyebrow>Näkyvyys</Eyebrow>
          <h2 ref={statement} className="t-h2 mt-8 max-w-[19ch] leading-[1.06]!">
            {STATEMENT.map(({ w, glow, fade }, i) => (
              <span key={i}>
                <span
                  data-w={fade ? 'fade' : 'on'}
                  className={
                    glow ? 't-serif text-gold-100 [text-shadow:0_0_.35em_rgb(255_190_100/0.55),0_0_1.2em_rgb(255_150_50/0.3)]' : fade ? 't-serif text-steel-300!' : ''
                  }
                >
                  {w}
                </span>{' '}
              </span>
            ))}
          </h2>
        </div>

        <div className="lg:col-span-4 lg:pt-28">
          <figure data-reveal>
            <LitImage asset={media.puukeskus} alt="Puukeskuksen keltainen valomainos palaa illalla julkisivussa." className="rounded-2xl" />
            <figcaption className="mt-3 flex justify-between text-[0.8rem] text-steel-300">
              <span>Puukeskus, Joensuu</span>
              <span>Valomainos</span>
            </figcaption>
          </figure>
          <p className="t-body mt-10" data-reveal>
            Valomainokset ovat pysyneet vuosia näkyvänä ja kestävänä tapana korostaa yrityksen julkisivua. Valolux
            toteuttaa pienet ja suuret valomainokset räätälöitynä niin yksityisille kuin yritysasiakkaille.
          </p>
          <dl className="mt-10 border-t border-paper/10" data-reveal>
            {[
              ['Perustettu', String(company.founded)],
              ['Toimipiste', `${company.address.street}, ${company.address.city}`],
              ['Toiminta', coreActivities.join(' · ')],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-paper/10 py-4">
                <dt className="t-label">{k}</dt>
                <dd className="text-right text-[0.95rem] text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
