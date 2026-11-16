import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MediaAsset } from '../../assets/media';

export type LightboxItem = { asset: MediaAsset; title: string; meta: string; alt: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onIndex: (i: number | null) => void;
};

/** Accessible image viewer on the native <dialog>: focus is trapped and restored, Esc closes. */
export function Lightbox({ items, index, onIndex }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const go = (step: number) => {
    if (index === null) return;
    onIndex((index + step + items.length) % items.length);
  };

  return (
    <dialog
      ref={dialog}
      aria-label={item ? `${item.title} – kuva ${index! + 1}/${items.length}` : 'Kuvankatselu'}
      className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-paper backdrop:bg-night-950/92 backdrop:backdrop-blur-md"
      onClose={() => onIndex(null)}
      onClick={(e) => e.target === e.currentTarget && onIndex(null)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      {item && (
        <div
          className="flex h-full flex-col items-center justify-center gap-6 px-4 py-20 sm:px-20"
          onClick={(e) => e.target === e.currentTarget && onIndex(null)}
        >
          <figure
            key={item.asset.src}
            className="flex max-h-full w-full flex-col items-center animate-[page-in_0.6s_var(--ease-expo)_both]"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              startX.current = null;
            }}
          >
            <img
              src={item.asset.src}
              width={item.asset.w}
              height={item.asset.h}
              alt={item.alt}
              className="max-h-[72dvh] w-auto max-w-full rounded-xl object-contain shadow-[0_40px_120px_-30px_rgb(255_170_70/0.35)] ring-1 ring-paper/10 select-none"
              style={{ width: `min(100%, ${Math.round(item.asset.w * 1.5)}px)` }}
              draggable={false}
            />
            <figcaption className="mt-6 flex w-full max-w-3xl items-baseline justify-between gap-6">
              <span>
                <span className="t-h3 block">{item.title}</span>
                <span className="mt-1 block text-sm text-steel-300">{item.meta}</span>
              </span>
              <span className="num shrink-0 text-sm text-steel-300">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>

          <div className="fixed top-4 right-4 sm:top-6 sm:right-6">
            <button type="button" onClick={() => onIndex(null)} className="btn btn-ghost size-12 p-0!" aria-label="Sulje kuva">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          {items.length > 1 && (
            <div className="fixed inset-x-4 bottom-4 flex justify-between sm:inset-x-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2">
              <button type="button" onClick={() => go(-1)} className="btn btn-ghost size-12 p-0!" aria-label="Edellinen kuva">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="btn btn-ghost size-12 p-0!" aria-label="Seuraava kuva">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
