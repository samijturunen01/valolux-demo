import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { ContactCta } from '../components/home/ContactCta';
import { ServiceVisual } from '../components/visuals/ServiceVisual';
import { LitImage } from '../components/ui/LitImage';
import { services, type Service } from '../content/services';
import { getProject } from '../content/projects';
import { media } from '../assets/media';
import { company } from '../content/company';
import { quoteLink } from '../content/navigation';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';
import { useInView } from '../hooks/useInView';
import { usePointerGlow } from '../hooks/usePointerGlow';

function TubeMotif() {
  return (
    <div className="absolute top-[38%] right-0 hidden w-[42vw] lg:block">
      <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,transparent,#fff6e2_18%,#fff_50%,#fff6e2_82%,transparent)] shadow-[0_0_18px_4px_rgb(255_200_130/0.55),0_0_80px_20px_rgb(255_160_60/0.18)] animate-[flicker-on_1.4s_0.6s_linear_both]" />
    </div>
  );
}

function ServiceSection({ service }: { service: Service }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const lit = useInView(visualRef, { threshold: 0.55 });
  usePointerGlow(visualRef);
  const related = service.related?.map(getProject) ?? [];

  return (
    <section id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-28 border-t border-paper/10 py-20 first:border-t-0 first:pt-4 lg:py-28">
      <div className="grid gap-10 xl:grid-cols-9 xl:gap-12">
        <div className="xl:col-span-4">
          <div ref={visualRef} className={`glow-card overflow-hidden xl:sticky xl:top-32 ${lit ? 'is-lit' : ''}`} data-reveal>
            <div className="aspect-[4/3]">
              <ServiceVisual kind={service.visual} lit={lit} />
            </div>
          </div>
        </div>
        <div className="xl:col-span-5">
          <p className="num t-label" data-reveal>
            {service.number}
          </p>
          <h2 id={`${service.id}-title`} className="t-h2 mt-3 text-[clamp(2rem,1.4rem+2.2vw,3.4rem)]!">
            <span className="mask-line">
              <span>{service.title}</span>
            </span>
          </h2>
          <p className="t-lead mt-6" data-reveal>
            {service.lead}
          </p>
          {service.body.map((p) => (
            <p key={p.slice(0, 24)} className="t-body mt-5" data-reveal>
              {p}
            </p>
          ))}

          {service.groups && (
            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2" data-reveal>
              {service.groups.map((g) => (
                <div key={g.title}>
                  <dt className="t-label border-b border-paper/10 pb-3">{g.title}</dt>
                  <dd>
                    <ul className="mt-3 space-y-2">
                      {g.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-[0.97rem] text-steel-200">
                          <span className="led is-on mt-[0.55em] size-[5px]!" aria-hidden="true" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-10 flex flex-wrap gap-2" data-reveal aria-label="Ominaisuudet">
            {service.tags.map((t) => (
              <li key={t} className="rounded-full px-3.5 py-1.5 text-[0.8rem] text-steel-200 ring-1 ring-paper/15">
                {t}
              </li>
            ))}
          </ul>

          {related.length > 0 && (
            <div className="mt-12" data-reveal>
              <p className="t-label">Toteutuksia</p>
              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link to="/toteutukset" className="group block">
                      <LitImage asset={media[p.id]} alt={p.alt} className="rounded-xl" />
                      <span className="mt-2 block text-[0.85rem] text-steel-200 transition-colors group-hover:text-gold-100">
                        {p.title}
                        {p.place ? <span className="text-steel-400">, {p.place}</span> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  useDocumentMeta('/palvelut');
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(services[0].id);
  useReveal(root);

  // Scroll-spy: the sub-navigation LED follows the section being read
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Palvelut"
        title={
          <>
            Valomainokset <span className="t-serif">suunnittelusta huoltoon.</span>
          </>
        }
        lead="Suunnittelemme, valmistamme, asennamme ja huollamme valomainokset – ja teemme lisäksi kyltit, opasteet ja teippaukset. Erikoisalaamme ovat valomainokset ulko- ja sisäkäyttöön."
        motif={<TubeMotif />}
      >
        <nav aria-label="Palvelut tällä sivulla" className="mt-12 lg:hidden" data-reveal>
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.88rem] text-steel-200 ring-1 ring-paper/15 transition hover:text-paper hover:ring-gold-300/50">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div ref={root} className="container-x pb-12 lg:grid lg:grid-cols-12 lg:gap-10">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Palvelut tällä sivulla" className="sticky top-32 pt-6">
            <ul className="space-y-1 border-l border-paper/10">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`-ml-px flex items-center gap-3 border-l py-2.5 pl-5 text-[0.92rem] transition-colors ${
                      active === s.id ? 'is-on border-gold-300 text-paper' : 'border-transparent text-steel-300 hover:text-paper'
                    }`}
                  >
                    <span className="led size-[5px]!" aria-hidden="true" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <Link to={quoteLink} className="btn btn-primary btn-sm mt-10">
              Pyydä tarjous <ArrowRight className="btn-icon size-4" aria-hidden="true" />
            </Link>
          </nav>
        </aside>

        <div className="lg:col-span-9">
          {services.map((s) => (
            <ServiceSection key={s.id} service={s} />
          ))}

          <div className="grid gap-5 border-t border-paper/10 pt-16 md:grid-cols-2" data-reveal>
            <div className="glow-card p-8 sm:p-10">
              <p className="t-label">Erikoistyöt</p>
              <h2 className="t-h3 mt-4">Jotain, mikä ei mahdu valmiisiin lokeroihin?</h2>
              <p className="t-body mt-4">Kerro ideastasi, niin arvioimme toteutuksen tapauskohtaisesti.</p>
              <Link to={quoteLink} className="link-light mt-8">
                Ota yhteyttä <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="glow-card p-8 sm:p-10">
              <p className="t-label">Mainostuotteet</p>
              <h2 className="t-h3 mt-4">Myös mainostuotteet ja -tekstiilit.</h2>
              <p className="t-body mt-4">Valoluxin kautta on saatavilla laaja valikoima mainostuotteita ja -asusteita.</p>
              <a href={company.promoShopUrl} target="_blank" rel="noopener noreferrer" className="link-light mt-8">
                Avaa verkkomallisto <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(avautuu uuteen välilehteen)</span>
              </a>
            </div>
          </div>
          <p className="mt-6 text-[0.78rem] text-steel-300">Kuvitukset ovat havainnekuvia, eivät valokuvia toteutuksista.</p>
        </div>
      </div>

      <ContactCta title="Kerro, mitä haluat valaista." />
    </>
  );
}
