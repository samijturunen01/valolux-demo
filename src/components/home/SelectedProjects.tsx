import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { featuredProjectIds, getProject, categoryLabels } from '../../content/projects';
import { media } from '../../assets/media';
import { useReveal } from '../../hooks/useReveal';
import { Eyebrow } from '../ui/Eyebrow';
import { Lightbox, type LightboxItem } from '../ui/Lightbox';
import { ProjectFigure } from '../projects/ProjectFigure';

/** Editorial, deliberately uneven placement – each photo gets its own moment. */
const PLACEMENT = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-44 sm:w-[86%] sm:ml-auto lg:w-auto',
  'lg:col-span-4 lg:-mt-20 sm:w-[64%] lg:w-auto',
  'lg:col-span-5 lg:mt-20 sm:w-[90%] sm:ml-auto lg:w-auto',
  'lg:col-span-3 lg:mt-56',
];

export function SelectedProjects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveal(root);
  const items = useMemo(() => featuredProjectIds.map(getProject), []);
  const lightboxItems: LightboxItem[] = items.map((p) => ({
    asset: media[p.id],
    title: p.title,
    meta: [p.place, categoryLabels[p.category]].filter(Boolean).join(' · '),
    alt: p.alt,
  }));

  return (
    <section ref={root} className="section-y relative overflow-hidden" aria-labelledby="projects-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-1/4 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_170_70/0.06),transparent)]"
      />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Toteutukset</Eyebrow>
            <h2 id="projects-title" className="t-h2 mt-8">
              <span className="mask-line">
                <span>Valoa Joensuusta</span>
              </span>
              <span className="mask-line">
                <span className="t-serif" style={{ ['--d' as string]: 120 }}>
                  Tikkakoskelle.
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4" data-reveal>
            <p className="t-body">
              Valikoima Valoluxin toteuttamia kohteita vuosien varrelta: valomainoksia, valokirjaimia ja mainostorneja.
            </p>
            <Link to="/toteutukset" className="link-light mt-6">
              Kaikki toteutukset <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 lg:mt-24 lg:grid-cols-12 lg:items-start">
          {items.map((p, i) => (
            <ProjectFigure key={p.id} project={p} number={i + 1} onOpen={() => setOpen(i)} className={PLACEMENT[i]} />
          ))}
        </div>
        <p className="mt-14 text-[0.78rem] text-steel-300">Kuvat: Valoluxin toteutuksia, valolux.net. Logot ja nimet ovat omistajiensa tavaramerkkejä.</p>
      </div>
      <Lightbox items={lightboxItems} index={open} onIndex={setOpen} />
    </section>
  );
}
