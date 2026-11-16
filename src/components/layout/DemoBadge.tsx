import { useEffect, useId, useRef, useState } from 'react';
import { Info, X } from 'lucide-react';

/** Always-available disclosure that this is a speculative demo, not the official website. */
export function DemoBadge() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div ref={wrap} className="fixed right-4 bottom-4 z-[60] max-sm:top-4 max-sm:right-[4.6rem] max-sm:bottom-auto print:hidden">
      {open && (
        <div
          id={id}
          role="region"
          aria-label="Tietoa demosta"
          className="absolute right-0 bottom-full mb-3 w-[min(22rem,calc(100vw-2rem))] max-sm:top-full max-sm:bottom-auto max-sm:mt-3 max-sm:mb-0 max-sm:-right-14 rounded-2xl bg-night-800/95 p-5 text-sm leading-relaxed text-steel-200 shadow-2xl ring-1 ring-paper/10 backdrop-blur-xl"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <p className="font-semibold text-paper">Konseptidemo</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-1 rounded-full p-1 text-steel-300 hover:text-paper"
              aria-label="Sulje"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p>
            Tämä on Valomainospalvelu Valoluxille laadittu ehdotus uudeksi verkkosivustoksi. Se ei ole yrityksen
            virallinen sivusto.
          </p>
          <p className="mt-2">
            Yhteydenottolomake toimii demotilassa: tietoja ei lähetetä eikä tallenneta. Referenssikuvat ovat
            Valoluxin nykyiseltä sivustolta.
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className="flex min-h-10 items-center gap-2 rounded-full bg-night-800/80 py-2 pr-3.5 pl-3 text-[0.68rem] font-medium tracking-[0.18em] text-steel-200 uppercase shadow-lg ring-1 ring-paper/12 backdrop-blur-xl transition hover:text-paper hover:ring-volt/40"
      >
        <span className="led led-volt is-on" aria-hidden="true" />
        Demo
        <Info className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
