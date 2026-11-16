import type { CSSProperties } from 'react';
import { Expand } from 'lucide-react';
import { media } from '../../assets/media';
import { categoryLabels, type Project } from '../../content/projects';
import { LitImage } from '../ui/LitImage';

type Props = {
  project: Project;
  number: number;
  onOpen: () => void;
  className?: string;
  style?: CSSProperties;
};

/** Reference photo with an animated caption; opens the lightbox. */
export function ProjectFigure({ project, number, onOpen, className = '', style }: Props) {
  const asset = media[project.id];
  const meta = [project.place, categoryLabels[project.category]].filter(Boolean).join(' · ');
  return (
    <figure className={`group ${className}`} data-reveal style={style}>
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left focus-visible:outline-offset-4"
      >
        <LitImage asset={asset} alt={project.alt} className="rounded-2xl" />
        <span className="sr-only">– avaa suurempi kuva</span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-night-900/70 text-paper opacity-0 ring-1 ring-paper/15 backdrop-blur-md transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <Expand className="size-4" />
        </span>
      </button>
      <figcaption className="mt-4 flex items-baseline gap-4">
        <span className="num t-label w-7 shrink-0">{String(number).padStart(2, '0')}</span>
        <span className="min-w-0 flex-1">
          <span className="mask-line">
            <span className="text-[1.15rem] font-semibold tracking-[-0.01em] [font-stretch:106%]">{project.title}</span>
          </span>
          <span className="mt-0.5 block text-[0.85rem] text-steel-300">{meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}
