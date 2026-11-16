import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const DIGITS = [
  'M70 26 L24 104 H100 M78 58 V138',
  'M180 26 C148 26 136 56 136 82 C136 110 148 138 180 138 C212 138 224 110 224 82 C224 56 212 26 180 26 Z',
  'M292 26 L246 104 H322 M300 58 V138',
];

/** A neon "404" whose last digit has a dying tube. */
export default function NotFoundPage() {
  useDocumentMeta('/404');
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-5 pt-28 pb-20 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgb(255_80_60/0.1),transparent_70%)]" />
      <div>
        <svg viewBox="0 0 346 164" className="mx-auto w-[min(78vw,520px)] overflow-visible" role="img" aria-label="404">
          <defs>
            <filter id="nf-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {DIGITS.map((d, i) => (
              <g key={i} className={i === 2 ? 'nf-dying' : undefined}>
                <path d={d} stroke="#2b2e36" strokeWidth="9" />
                <g className="nf-lit">
                  <path d={d} stroke="#ff3a2a" strokeWidth="18" opacity="0.5" filter="url(#nf-glow)" />
                  <path d={d} stroke="#ff6b5c" strokeWidth="7.5" />
                  <path d={d} stroke="#ffe2dc" strokeWidth="2.4" />
                </g>
              </g>
            ))}
          </g>
        </svg>
        <h1 className="t-h1 mx-auto mt-12 max-w-[14ch] outline-none" data-page-title tabIndex={-1}>
          Tämä kyltti on <span className="t-serif">sammunut.</span>
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-md">Etsimääsi sivua ei löytynyt. Se on ehkä siirretty tai poistettu.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            Etusivulle <ArrowRight className="btn-icon size-4" aria-hidden="true" />
          </Link>
          <Link to="/palvelut" className="btn btn-ghost">
            Palvelut
          </Link>
          <Link to="/yhteystiedot" className="btn btn-ghost">
            Yhteystiedot
          </Link>
        </div>
      </div>
      <style>{`
        .nf-dying .nf-lit { animation: nf-die 6s steps(1, end) infinite; }
        @keyframes nf-die {
          0%, 61%, 70%, 82%, 100% { opacity: 1; }
          62%, 76% { opacity: .18; }
          66% { opacity: .6; }
        }
        @media (prefers-reduced-motion: reduce) { .nf-dying .nf-lit { animation: none; opacity: .35; } }
      `}</style>
    </section>
  );
}
