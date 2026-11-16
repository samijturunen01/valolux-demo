import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { services } from '../../content/services';
import { useReveal } from '../../hooks/useReveal';
import { Eyebrow } from '../ui/Eyebrow';
import { ServiceCard } from './ServiceCard';

/** Asymmetric arrangement: one tall feature, two medium, three compact. */
const LAYOUT = [
  { card: 'lg:col-span-7 lg:row-span-2', visual: 'aspect-[16/10] lg:aspect-auto lg:flex-[4_1_0%]' },
  { card: 'lg:col-span-5', visual: 'aspect-[16/9]' },
  { card: 'lg:col-span-5', visual: 'aspect-[16/9]' },
  { card: 'lg:col-span-4', visual: 'aspect-[16/10]' },
  { card: 'lg:col-span-4', visual: 'aspect-[16/10]' },
  { card: 'lg:col-span-4', visual: 'aspect-[16/10]' },
];

export function ServicesShowcase() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="section-y relative bg-night-950/60" aria-labelledby="services-title">
      <div className="light-rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Palvelut</Eyebrow>
            <h2 id="services-title" className="t-h2 mt-8">
              <span className="mask-line">
                <span>Suunnittelusta huoltoon.</span>
              </span>
              <span className="mask-line">
                <span className="t-serif" style={{ ['--d' as string]: 120 }}>
                  Yhdeltä tekijältä.
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <p className="t-body max-w-md">
              Toimintaamme kuuluu valomainosten suunnittelu, valmistus, asennus ja huolto. Erikoisalaamme ovat
              valomainokset ulko- ja sisäkäyttöön – lisäksi teemme kyltit, opasteet ja teippaukset.
            </p>
            <Link to="/palvelut" className="link-light mt-6">
              Kaikki palvelut <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} className={LAYOUT[i].card} visualClassName={LAYOUT[i].visual} delay={(i % 3) * 90} />
          ))}
        </div>
        <p className="mt-6 text-[0.78rem] text-steel-300">Kuvitukset ovat havainnekuvia, eivät valokuvia toteutuksista.</p>
      </div>
    </section>
  );
}
