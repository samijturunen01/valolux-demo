import { useRef } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../components/contact/ContactForm';
import { LitImage } from '../components/ui/LitImage';
import { media } from '../assets/media';
import { company } from '../content/company';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';
import { usePointerGlow } from '../hooks/usePointerGlow';

export default function ContactPage() {
  useDocumentMeta('/yhteystiedot');
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  useReveal(root);
  usePointerGlow(card);

  return (
    <>
      <PageHero
        eyebrow="Yhteystiedot"
        title={
          <>
            Pyydä <span className="t-serif">tarjous.</span>
          </>
        }
        lead="Kerro tarpeestasi lomakkeella tai soita suoraan. Tarjouspyynnössä voit käyttää arvioituja mittoja."
      />

      <div ref={root} className="container-x grid gap-14 pb-28 lg:grid-cols-12 lg:gap-10 lg:pb-40">
        <aside className="lg:col-span-4" aria-label="Yhteystiedot">
          <div className="space-y-10 lg:sticky lg:top-32">
            <div data-reveal>
              <p className="t-label flex items-center gap-2">
                <Phone className="size-3.5" aria-hidden="true" /> Puhelin
              </p>
              <ul className="mt-4 space-y-1">
                {company.phones.map((p) => (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      className="num text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] font-semibold tracking-[-0.02em] text-paper transition-[color,text-shadow] duration-500 [font-stretch:108%] hover:text-gold-100 hover:[text-shadow:0_0_.4em_rgb(255_190_100/0.55)]"
                    >
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="t-label flex items-center gap-2">
                <Mail className="size-3.5" aria-hidden="true" /> Sähköposti
              </p>
              <a href={`mailto:${company.email}`} className="mt-3 inline-block break-all text-[1.1rem] text-paper underline decoration-paper/25 underline-offset-[6px] transition hover:text-gold-100 hover:decoration-gold-300">
                {company.email}
              </a>
            </div>
            <div data-reveal>
              <p className="t-label flex items-center gap-2">
                <MapPin className="size-3.5" aria-hidden="true" /> Käyntiosoite
              </p>
              <address className="mt-3 text-[1.1rem] leading-relaxed text-paper not-italic">
                {company.name}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </address>
              <p className="mt-2 text-[0.9rem] text-steel-300">{company.address.note}</p>
              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="link-light mt-4 text-[0.9rem]">
                Avaa kartalla <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(Google Maps, avautuu uuteen välilehteen)</span>
              </a>
            </div>
            <figure data-reveal className="max-w-sm">
              <LitImage
                asset={media.toimipiste}
                alt="Valoluxin toimipiste Paukkajantiellä: julkisivussa sininen VALOMAINOSPALVELU ValoLux -kyltti ja edessä pakettiauto."
                className="rounded-2xl"
              />
              <figcaption className="t-serif mt-4 text-[1.35rem] leading-snug">Tervetuloa tutustumaan toimintaamme Paukkajantielle!</figcaption>
            </figure>
            <p className="text-[0.85rem] text-steel-400" data-reveal>
              Y-tunnus <span className="num">{company.businessId}</span>
            </p>
          </div>
        </aside>

        <section id="tarjouspyynto" className="scroll-mt-28 lg:col-span-8" aria-labelledby="form-title">
          <div ref={card} className="glow-card p-6 sm:p-10 lg:p-12" data-reveal>
            <h2 id="form-title" className="t-h2 text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)]! outline-none" tabIndex={-1} data-focus-target>
              Tarjouspyyntö
            </h2>
            <p className="t-body mt-3 mb-8">Täytä tiedot, niin otamme yhteyttä.</p>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
