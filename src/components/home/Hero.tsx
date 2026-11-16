import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { IlluminatedSign, letterCenters } from '../brand/IlluminatedSign';
import { quoteLink } from '../../content/navigation';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';

const SUB = 'Valomainospalvelu';
const HEADLINE: { text: string; serif?: boolean }[] = [
  { text: 'Valoa,' },
  { text: 'joka' },
  { text: 'tekee' },
  { text: 'vaikutuksen.', serif: true },
];

/**
 * Per-letter power-up patterns as [opacity, seconds] steps. At most two dips per
 * letter, spread over ~0.7 s, keeps the flicker restrained and well below the
 * WCAG 2.3.1 three-flashes-per-second threshold.
 */
const FLICKER: [number, number][][] = [
  [[0.55, 0.06], [0.16, 0.1], [0.9, 0.08], [0.5, 0.16], [1, 0.32]], // V
  [[0.72, 0.1], [1, 0.32]], // a
  [[0.5, 0.06], [0.2, 0.12], [1, 0.32]], // l
  [[0.82, 0.1], [1, 0.32]], // o
  [[0.6, 0.06], [0.18, 0.1], [0.95, 0.08], [0.48, 0.16], [1, 0.32]], // L
  [[0.76, 0.1], [1, 0.32]], // u
  [[0.5, 0.07], [0.16, 0.12], [1, 0.32]], // x
];
/** Two letters stutter once more while the "power" stabilises */
const STUTTER: [index: number, at: number][] = [
  [3, 2.45],
  [5, 2.75],
];

type Els = Record<
  'lit' | 'hot' | 'bloom' | 'halo' | 'spill' | 'ribs' | 'refl' | 'sheen' | 'sub' | 'words' | 'fades' | 'cue',
  HTMLElement[]
> & { spark: HTMLElement };

/** Timestamp of the first intro in this page load. Later visits to "/" get the quick version;
 *  a re-run within a moment (React StrictMode remount) still counts as the first. */
let introStartedAt = 0;

function setOff(E: Els, withText: boolean) {
  gsap.set([...E.lit, ...E.bloom, ...E.halo, ...E.ribs, ...E.refl, ...E.hot], { opacity: 0 });
  gsap.set(E.spill, { opacity: 0, scale: 0.82 });
  gsap.set(E.spark, { opacity: 0 });
  gsap.set(E.sub, { opacity: 0.16 });
  if (withText) {
    gsap.set(E.words, { yPercent: 150 });
    gsap.set(E.fades, { opacity: 0, y: 16 });
    gsap.set(E.cue, { opacity: 0 });
  }
}

/** Phases 2–3: electrical activation → illumination. Returns the time the sign is fully lit. */
function ignite(tl: gsap.core.Timeline, t0: number, E: Els, style: 'cinematic' | 'quick' | 'fade', small: boolean) {
  let litAt = t0;
  if (style === 'cinematic') {
    const sweep = small ? 1.05 : 1.3;
    tl.set(E.spark, { left: '-2%', top: '58%', scale: 0.25, opacity: 0 }, t0)
      .to(E.spark, { opacity: 1, scale: 1, duration: 0.28 }, t0 + 0.02)
      .to(E.spark, { left: '102%', duration: sweep, ease: 'none' }, t0 + 0.1);

    letterCenters.forEach((c, i) => {
      const t = t0 + 0.1 + sweep * ((c * 100 + 2) / 104);
      const f = gsap.timeline();
      FLICKER[i].forEach(([o, d], k) => f.to(E.lit[i], { opacity: o, duration: d, ease: 'none' }, k === 3 ? '+=0.07' : '>'));
      tl.add(f, t);
      const lastStep = t + f.duration() - 0.32;
      tl.to(E.hot[i], { opacity: 0.55, duration: 0.32, ease: 'none' }, lastStep)
        .to(E.hot[i], { opacity: 0, duration: 1.5, ease: 'power2.out' }, lastStep + 0.32)
        .to(E.bloom[i], { opacity: 1, duration: 0.7 }, lastStep);
    });
    for (const [i, at] of STUTTER) {
      tl.to([E.lit[i], E.bloom[i]], { opacity: 0.45, duration: 0.06, ease: 'none' }, t0 + at)
        .to([E.lit[i], E.bloom[i]], { opacity: 1, duration: 0.28 }, '>');
    }
    const crossed = t0 + 0.1 + sweep;
    tl.to(E.spark, { left: '97.5%', top: '-9%', scale: 0.55, duration: 0.85, ease: 'power3.inOut' }, crossed).call(
      () => E.spark.classList.add('is-twinkle'),
      [],
      crossed + 0.85,
    );
    litAt = t0 + 1.25;
  } else {
    const d = style === 'fade' ? 0.35 : 0.55;
    const s = style === 'fade' ? 0 : 0.06;
    tl.to(E.lit, { opacity: 1, duration: d, stagger: s }, t0)
      .to(E.bloom, { opacity: 1, duration: d, stagger: s }, t0 + 0.05)
      .set(E.spark, { left: '97.5%', top: '-9%', scale: 0.2 }, t0)
      .to(E.spark, { opacity: 1, scale: 0.55, duration: d + 0.2 }, t0 + 0.2)
      .call(() => E.spark.classList.add('is-twinkle'), [], t0 + d + 0.4);
    litAt = t0 + (style === 'fade' ? 0 : 0.15);
  }
  const env = style === 'fade' ? 0.45 : style === 'quick' ? 1.2 : 1.6;
  tl.to(E.halo, { opacity: 1, duration: env, ease: 'power2.inOut' }, litAt)
    .to(E.spill, { opacity: 1, scale: 1, duration: env * 1.4, ease: 'power3.out' }, litAt)
    .to(E.ribs, { opacity: 0.9, duration: env * 1.5 }, litAt + 0.2)
    .to(E.refl, { opacity: 0.38, duration: env }, litAt + 0.3)
    .to(E.sub, { opacity: 1, duration: 0.18, stagger: style === 'fade' ? 0 : 0.03, ease: 'none' }, litAt + env * 0.5);
  return litAt + env * 0.5;
}

function extinguish(tl: gsap.core.Timeline, E: Els, flicker: boolean) {
  E.spark.classList.remove('is-twinkle');
  tl.to(E.spark, { opacity: 0, scale: 0.3, duration: 0.35 }, 0).set(E.hot, { opacity: 0 }, 0);
  [...E.lit].reverse().forEach((el, k) => {
    const t = flicker ? k * 0.05 : 0;
    if (flicker) {
      // explicit '>' chains each step to this letter's previous step, not to the timeline's end
      tl.to(el, { opacity: 0.3, duration: 0.05, ease: 'none' }, t)
        .to(el, { opacity: 0.7, duration: 0.06, ease: 'none' }, '>')
        .to(el, { opacity: 0, duration: 0.35 }, '>');
    } else {
      tl.to(el, { opacity: 0, duration: 0.3 }, t);
    }
  });
  tl.to(E.bloom, { opacity: 0, duration: 0.4, stagger: { each: flicker ? 0.05 : 0, from: 'end' } }, 0.05)
    .to([...E.halo, ...E.ribs, ...E.refl], { opacity: 0, duration: 0.8 }, 0.1)
    .to(E.spill, { opacity: 0, scale: 0.86, duration: 1 }, 0.1)
    .to(E.sub, { opacity: 0.16, duration: 0.35, stagger: { each: flicker ? 0.02 : 0, from: 'end' } }, 0.1);
}

function revealText(tl: gsap.core.Timeline, t: number, E: Els) {
  tl.to(E.words, { yPercent: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, t)
    .to(E.fades, { opacity: 1, y: 0, duration: 0.95, stagger: 0.1, ease: 'power3.out' }, t + 0.35)
    .to(E.cue, { opacity: 1, duration: 0.9 }, t + 1);
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const powerRef = useRef<(on: boolean) => void>(() => {});
  const [on, setOn] = useState(true);

  useLayoutEffect(() => {
    const el = root.current!;
    const reduced = prefersReducedMotion();
    const small = window.matchMedia('(max-width: 767px)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const now = performance.now();
    const firstLoad = introStartedAt === 0 || now - introStartedAt < 800;
    if (introStartedAt === 0) introStartedAt = now;
    const mode = reduced || window.scrollY > 40 ? 'static' : firstLoad ? 'cinematic' : 'quick';

    const q = gsap.utils.selector(el);
    const E: Els = {
      lit: q('[data-lit]'),
      hot: q('[data-hot]'),
      bloom: q('[data-bloom]'),
      halo: q('[data-sign-halo]'),
      spill: q('[data-hero-spill]'),
      ribs: q('[data-hero-ribs]'),
      refl: q('[data-sign-reflection]'),
      sheen: q('[data-sheen]'),
      sub: q('[data-sub-char]'),
      words: q('[data-hero-word]'),
      fades: q('[data-hero-fade]'),
      cue: q('[data-hero-cue]'),
      spark: q('[data-sign-spark]')[0],
    };

    let current: gsap.core.Timeline | null = null;
    let sheen: gsap.core.Tween | null = null;
    const ctx = gsap.context(() => {}, el);

    const setAlive = (alive: boolean) => {
      el.classList.toggle('is-alive', alive && !reduced);
      sheen?.kill();
      sheen = null;
      if (alive && !reduced) {
        sheen = gsap.fromTo(
          E.sheen,
          { attr: { x: -320 }, opacity: 0.9 },
          { attr: { x: 1250 }, duration: 2.6, ease: 'power2.inOut', repeat: -1, repeatDelay: 8, delay: 1.5 },
        );
      } else {
        gsap.set(E.sheen, { opacity: 0 });
      }
    };

    ctx.add(() => {
      if (mode === 'static') {
        E.spark.classList.add('is-twinkle');
        setAlive(true);
        return;
      }
      setOff(E, true);
      current = gsap.timeline({ onComplete: () => setAlive(true), delay: mode === 'cinematic' ? 0.35 : 0.05 });
      const litAt = ignite(current, 0, E, mode, small);
      revealText(current, mode === 'cinematic' ? litAt + 0.15 : 0.3, E);
    });

    // Any interaction during the intro jumps straight to the final state.
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    const skip = () => {
      if (current && current.progress() < 1) current.progress(1);
      events.forEach((ev) => window.removeEventListener(ev, skip));
    };
    if (mode !== 'static') events.forEach((ev) => window.addEventListener(ev, skip, { passive: true }));

    powerRef.current = (next: boolean) =>
      ctx.add(() => {
        current?.progress(1).kill();
        setAlive(false);
        current = gsap.timeline({ onComplete: next ? () => setAlive(true) : undefined });
        if (next) ignite(current, 0, E, reduced ? 'fade' : 'cinematic', small);
        else extinguish(current, E, !reduced);
      });

    // Desktop: the sign tilts subtly towards the pointer, revealing its depth.
    let removeTilt = () => {};
    if (fine && !reduced) {
      const tiltEl = q('[data-sign-tilt]')[0];
      gsap.set(tiltEl, { transformPerspective: 1300 });
      const rx = gsap.quickTo(tiltEl, 'rotationX', { duration: 1.4, ease: 'power3' });
      const ry = gsap.quickTo(tiltEl, 'rotationY', { duration: 1.4, ease: 'power3' });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        rx(((e.clientY - r.top) / r.height - 0.45) * -7);
        ry(((e.clientX - r.left) / r.width - 0.5) * 9);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      removeTilt = () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    }

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, skip));
      removeTilt();
      sheen?.kill();
      ctx.revert();
    };
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    powerRef.current(next);
  };

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-sky" />
        <div className="hero-ribs" data-hero-ribs />
        <div className="hero-spill" data-hero-spill />
      </div>

      <div className="hero-stage container-x">
        <p className="hero-sub" aria-hidden="true">
          {SUB.split('').map((c, i) => (
            <span key={i} data-sub-char>
              {c}
            </span>
          ))}
        </p>
        <IlluminatedSign className="hero-sign" />
        <div className="mt-[clamp(2.5rem,8vw,5.5rem)] flex justify-center md:absolute md:right-[clamp(1.25rem,4.2vw,3.75rem)] md:bottom-4 md:mt-0">
          <button type="button" role="switch" aria-checked={on} onClick={toggle} className="power" data-hero-fade>
            <span className={`led ${on ? 'is-on' : ''}`} aria-hidden="true" />
            <span>Valot {on ? 'päällä' : 'pois'}</span>
            <span className="power-track" aria-hidden="true">
              <span className="power-knob" />
            </span>
          </button>
        </div>
      </div>

      <div className="container-x hero-bottom">
        <div>
          <p className="t-eyebrow mb-5" data-hero-fade>
            <span className="led is-on" aria-hidden="true" />
            Joensuu · vuodesta 2000
          </p>
          <h1 id="hero-title" className="t-display hero-title outline-none" data-page-title tabIndex={-1}>
            {HEADLINE.map((w, i) => (
              <span key={w.text}>
                <span className="hero-word-mask">
                  <span data-hero-word className={w.serif ? 't-serif' : undefined}>
                    {w.text}
                  </span>
                </span>
                {i < HEADLINE.length - 1 ? ' ' : null}
                {i === 2 && <br className="hidden lg:block" />}
              </span>
            ))}
          </h1>
        </div>
        <div className="lg:pb-2">
          <p className="t-lead max-w-[34rem]" data-hero-fade>
            Suunnittelemme, valmistamme, asennamme ja huollamme valomainokset yrityksille ja yksityisille – pienistä
            kylteistä suuriin julkisivuihin.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-hero-fade>
            <Link to={quoteLink} className="btn btn-primary">
              Pyydä tarjous
              <ArrowRight className="btn-icon size-4" aria-hidden="true" />
            </Link>
            <Link to="/toteutukset" className="btn btn-ghost">
              Tutustu toteutuksiin
            </Link>
          </div>
        </div>
      </div>

      <a href="#esittely" className="hero-cue" data-hero-cue>
        Vieritä
        <span className="hero-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
