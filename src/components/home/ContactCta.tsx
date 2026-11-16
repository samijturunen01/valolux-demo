import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useReveal } from '../../hooks/useReveal';
import { SignHeadline } from '../ui/SignHeadline';
import { Eyebrow } from '../ui/Eyebrow';
import { company } from '../../content/company';
import { quoteLink } from '../../content/navigation';

/** Closing moment: the room is dark until the headline switches on and lights the wall around it. */
export function ContactCta({ title = 'Tehdään yrityksestäsi näkyvä.' }: { title?: string }) {
  const root = useRef<HTMLElement>(null);
  const on = useInView(root, { threshold: 0.35 });
  useReveal(root);
  const phone = company.phones[0];
  return (
    <section
      ref={root}
      className={`cta-dark relative isolate overflow-hidden py-[clamp(7rem,6rem+9vw,15rem)] text-center ${on ? 'is-on' : ''}`}
      aria-label="Ota yhteyttä"
    >
      <div aria-hidden="true" className="cta-spill" />
      <div aria-hidden="true" className="cta-ribs" />
      <div className="container-x relative">
        <Eyebrow className="justify-center">Ota yhteyttä</Eyebrow>
        <SignHeadline text={title} className="t-display mx-auto mt-10 max-w-[14ch]" />
        <p className="t-lead mx-auto mt-10 max-w-xl" data-reveal style={{ ['--d' as string]: 900 }}>
          Kerro, mitä olet suunnitellut. Tarjouspyynnössä voit käyttää arvioituja mittoja – loput selvitetään yhdessä.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row" data-reveal style={{ ['--d' as string]: 1050 }}>
          <Link to={quoteLink} className="btn btn-primary">
            Pyydä tarjous
            <ArrowRight className="btn-icon size-4" aria-hidden="true" />
          </Link>
          <a href={phone.href} className="btn btn-ghost">
            <Phone className="size-4" aria-hidden="true" />
            Soita <span className="num">{phone.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
