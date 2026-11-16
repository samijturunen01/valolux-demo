import { useRef, type ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Decorative light element unique to each page */
  motif?: ReactNode;
  children?: ReactNode;
};

/** Opening section for sub-pages: a calm dark field, one line of light, editorial heading. */
export function PageHero({ eyebrow, title, lead, motif, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_70%_0%,rgb(255_170_70/0.09),transparent_70%),radial-gradient(ellipse_90%_70%_at_0%_100%,rgb(30_44_80/0.25),transparent_70%)]"
      />
      {motif && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {motif}
        </div>
      )}
      <div className="container-x">
        <p className="t-eyebrow is-on" data-reveal>
          <span className="led" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="t-h1 mt-8 max-w-[16ch] outline-none" data-page-title tabIndex={-1}>
          <span className="mask-line">
            <span>{title}</span>
          </span>
        </h1>
        {lead && (
          <div className="t-lead mt-8 max-w-[44rem]" data-reveal style={{ ['--d' as string]: 250 }}>
            {lead}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
