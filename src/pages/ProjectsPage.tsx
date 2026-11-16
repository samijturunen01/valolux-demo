import { useMemo, useRef, useState } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { ContactCta } from '../components/home/ContactCta';
import { ProjectFigure } from '../components/projects/ProjectFigure';
import { Lightbox, type LightboxItem } from '../components/ui/Lightbox';
import { categoryLabels, projects, type ProjectCategory } from '../content/projects';
import { media } from '../assets/media';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';

type Filter = 'kaikki' | ProjectCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'kaikki', label: 'Kaikki' },
  { key: 'valomainos', label: 'Valomainokset' },
  { key: 'kirjaimet', label: 'Valokirjaimet' },
  { key: 'torni', label: 'Mainostornit' },
  { key: 'teippaus', label: 'Teippaukset' },
];

/** Repeating asymmetric rhythm for the grid */
const RHYTHM = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-28',
  'lg:col-span-4',
  'lg:col-span-4 lg:mt-20',
  'lg:col-span-4 lg:mt-40',
  'lg:col-span-6',
  'lg:col-span-6 lg:mt-24',
];

function DotMotif() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_200_130/0.22)_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_45%_60%_at_85%_30%,#000,transparent_70%)]" />
  );
}

export default function ProjectsPage() {
  useDocumentMeta('/toteutukset');
  const [filter, setFilter] = useState<Filter>('kaikki');
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const list = useMemo(() => (filter === 'kaikki' ? projects : projects.filter((p) => p.category === filter)), [filter]);
  useReveal(root, [filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { kaikki: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const lightboxItems: LightboxItem[] = list.map((p) => ({
    asset: media[p.id],
    title: p.title,
    meta: [p.place, categoryLabels[p.category]].filter(Boolean).join(' · '),
    alt: p.alt,
  }));

  return (
    <>
      <PageHero
        eyebrow="Toteutukset"
        title={
          <>
            Kohteita <span className="t-serif">vuosien varrelta.</span>
          </>
        }
        lead="Valikoima Valoluxin toteuttamia valomainoksia, valokirjaimia, mainostorneja ja teippauksia – Joensuusta Outokumpuun, Pankakoskelle ja Tikkakoskelle."
        motif={<DotMotif />}
      />

      <div ref={root} className="container-x pb-28">
        <div className="flex flex-col gap-6 border-y border-paper/10 py-5 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Suodata toteutuksia" className="-mx-1 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex min-h-11 items-center gap-2.5 rounded-full px-4 text-[0.9rem] transition ${
                    active ? 'is-on bg-gold-300/10 text-paper ring-1 ring-gold-300/50' : 'text-steel-200 ring-1 ring-paper/12 hover:text-paper hover:ring-paper/30'
                  }`}
                >
                  <span className="led size-[5px]!" aria-hidden="true" />
                  {f.label}
                  <span className="num text-[0.78rem] text-steel-400">{counts[f.key] ?? 0}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[0.85rem] text-steel-300" aria-live="polite">
            Näytetään {list.length} {list.length === 1 ? 'kohde' : 'kohdetta'}
          </p>
        </div>

        <div key={filter} className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
          {list.map((p, i) => (
            <ProjectFigure
              key={p.id}
              project={p}
              number={projects.indexOf(p) + 1}
              onOpen={() => setOpen(i)}
              className={RHYTHM[i % RHYTHM.length]}
              style={{ ['--d' as string]: (i % 3) * 80 }}
            />
          ))}
        </div>

        <div className="mt-20 grid gap-6 border-t border-paper/10 pt-8 text-[0.82rem] leading-relaxed text-steel-300 md:grid-cols-2">
          <p>
            Kuvat ja kohteiden nimet: Valoluxin nykyinen verkkosivusto (valolux.net). Ikkunateippauskuvat on julkaistu
            ilman kohteen nimeä, joten ne on kuvattu yleisellä tasolla.
          </p>
          <p>Kuvissa näkyvät logot ja nimet ovat omistajiensa tavaramerkkejä, ja ne esitetään referensseinä.</p>
        </div>
      </div>

      <Lightbox items={lightboxItems} index={open} onIndex={setOpen} />
      <ContactCta title="Seuraava kohde voi olla sinun." />
    </>
  );
}
