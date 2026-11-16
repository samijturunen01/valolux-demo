import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import { useReveal } from '../../hooks/useReveal';
import { Eyebrow } from '../ui/Eyebrow';
import { LitImage } from '../ui/LitImage';
import { media } from '../../assets/media';

/** Stages follow the company's own description of its work: design, manufacture, installation, service. */
export const PROCESS_STEPS = [
  {
    title: 'Yhteydenotto ja tarjous',
    text: 'Kerro, millaista mainosta tarvitset ja mihin. Tarjouspyynnössä voit käyttää arvioituja mittoja.',
  },
  {
    title: 'Suunnittelu',
    text: 'Suunnittelemme mainoksen tukemaan yrityksesi julkisivua ja näkyvyyttä kaupunkikuvassa – tarvittaessa valmiin aineiston pohjalta.',
  },
  {
    title: 'Valmistus',
    text: 'Mainos valmistetaan kohteeseen sopivista materiaaleista, kuten alumiinista, akryylista, PL-kennomuovista, messingistä tai kuparista.',
  },
  {
    title: 'Asennus',
    text: 'Asennamme valmiin mainoksen paikalleen – julkisivuun, katolle, ikkunaan tai mainostorniin.',
  },
  {
    title: 'Huolto',
    text: 'Huollamme ja korjaamme valomainokset, neonit ja LED-mainokset. Tuotteillamme on tuotteesta riippuen 1–2 vuoden käyttötakuu.',
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useReveal(root);

  // A line of light runs down the stages as the visitor scrolls; each stage powers on as it is reached.
  useLayoutEffect(() => {
    const steps = list.current!.querySelectorAll<HTMLElement>('[data-step]');
    if (prefersReducedMotion()) {
      steps.forEach((s) => s.classList.add('is-on'));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-path]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 62%', end: 'bottom 62%', scrub: 0.4 } },
      );
      gsap.fromTo(
        '[data-path-head]',
        { y: 0 },
        {
          y: () => list.current!.offsetHeight - 20,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top 62%', end: 'bottom 62%', scrub: 0.4, invalidateOnRefresh: true },
        },
      );
      steps.forEach((s) =>
        gsap.timeline({
          scrollTrigger: {
            trigger: s,
            start: 'top 62%',
            onEnter: () => s.classList.add('is-on'),
            onLeaveBack: () => s.classList.remove('is-on'),
          },
        }),
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-y relative bg-night-950/60" aria-labelledby="process-title">
      <div className="light-rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Prosessi</Eyebrow>
            <h2 id="process-title" className="t-h2 mt-8">
              <span className="mask-line">
                <span>Ideasta</span>
              </span>
              <span className="mask-line">
                <span className="t-serif" style={{ ['--d' as string]: 120 }}>
                  asennukseen.
                </span>
              </span>
            </h2>
            <p className="t-body mt-8 max-w-md" data-reveal>
              Hoidamme valomainoksen koko elinkaaren – ensimmäisestä luonnoksesta siihen hetkeen, kun valot syttyvät, ja
              vielä sen jälkeenkin.
            </p>
            <figure className="mt-10 hidden lg:block" data-reveal>
              <LitImage
                asset={media.verstas}
                alt="Valomainoskotelon kokoonpanoa verstaalla: alumiinirunko ja loisteputket."
                className="rounded-2xl"
              />
              <figcaption className="mt-3 text-[0.8rem] text-steel-300">Valomainoskotelon kokoonpanoa Valoluxin tiloissa.</figcaption>
            </figure>
          </div>
        </div>

        <ol ref={list} className="process-list relative lg:col-span-6 lg:col-start-7 lg:pt-4">
          <div aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-px bg-paper/10" />
          <div
            aria-hidden="true"
            data-path
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-gradient-to-b from-gold-100 via-gold-200 to-gold-400 shadow-[0_0_10px_1px_rgb(255_180_80/0.6)]"
          />
          <div
            aria-hidden="true"
            data-path-head
            className="absolute top-2 left-[6px] size-[11px] rounded-full bg-gold-50 shadow-[0_0_0_3px_rgb(255_210_140/0.25),0_0_18px_6px_rgb(255_180_80/0.55)] motion-reduce:hidden"
          />
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} data-step className="process-step relative pb-16 pl-16 last:pb-0 sm:pl-20">
              <span className="process-node absolute top-0.5 left-0 grid size-[23px] place-items-center rounded-full bg-night-900 ring-1 ring-paper/15">
                <span className="led" aria-hidden="true" />
              </span>
              <span className="num t-label">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h3 mt-2">{s.title}</h3>
              <p className="t-body mt-3 max-w-[46ch]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
