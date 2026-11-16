import { useRef } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { ContactCta } from '../components/home/ContactCta';
import { LitImage } from '../components/ui/LitImage';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Starburst } from '../components/brand/Starburst';
import { media } from '../assets/media';
import { company } from '../content/company';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';

const ACTIVITIES = [
  { title: 'Suunnittelu', text: 'Näkyvät mainokset, jotka tukevat yrityksen julkisivua ja erottuvat kaupunkikuvassa.' },
  { title: 'Valmistus', text: 'Valomainoskotelot, LED- ja neonmainokset, kyltit, opasteet ja mainostornit.' },
  { title: 'Asennus', text: 'Valmis mainos paikalleen julkisivuun, katolle, ikkunaan tai torniin.' },
  { title: 'Huolto', text: 'Putket, sytyttimet, kuristimet, muuntajat ja LEDit – sekä 1–2 vuoden käyttötakuu.' },
];

function StarMotif() {
  return (
    <div className="absolute top-28 right-[8vw] hidden w-[clamp(120px,14vw,220px)] opacity-90 lg:block">
      <div className="animate-[twinkle_6s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgb(255_200_120/0.7)] motion-reduce:animate-none">
        <Starburst />
      </div>
    </div>
  );
}

export default function AboutPage() {
  useDocumentMeta('/yritys');
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <>
      <PageHero
        eyebrow="Yritys"
        title={
          <>
            Valoa yöhön <span className="t-serif">vuodesta {company.founded}.</span>
          </>
        }
        lead="Valomainospalvelu Valolux on joensuulainen valomainosyritys. Suunnittelemme, valmistamme, asennamme ja huollamme valomainokset yrityksille ja yksityisille asiakkaille."
        motif={<StarMotif />}
      />

      <div ref={root}>
        <section className="container-x grid gap-14 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-36" aria-label="Tarina">
          <blockquote className="lg:col-span-5" data-reveal>
            <p className="t-serif text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] leading-[1.05]">
              ”Tervetuloa tutustumaan toimintaamme Paukkajantielle!”
            </p>
          </blockquote>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p className="t-lead" data-reveal>
              Valolux on perustettu helmikuussa {company.founded}. Toimipisteemme sijaitsee Joensuun teollisuusalueella
              osoitteessa {company.address.street}.
            </p>
            <p className="t-body" data-reveal>
              Suunnittelemme ja toteutamme tilauksestanne näkyviä mainoksia tukemaan yrityksenne julkisivua – ja sitä
              kautta tehokkaampaa näkyvyyttä myös kaupunkikuvassa.
            </p>
            <p className="t-body" data-reveal>
              Erikoisalaamme ovat valomainokset ulko- ja sisäkäyttöön, mutta tarjoamme laajasti palveluja myös kylttien
              ja erilaisten teippausten muodossa. Pienet ja suuret valomainokset toteutetaan räätälöitynä niin
              yksityisille kuin yritysasiakkaille.
            </p>
          </div>
        </section>

        {/* Authentic photographs, composed as an uneven triptych */}
        <section className="container-x pb-24 lg:pb-36" aria-label="Kuvia">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <figure className="lg:col-span-7" data-reveal>
              <LitImage
                asset={media.pakettiauto}
                alt="Valoluxin pakettiauton kylki: tähti, teksti VALOA YÖHÖN, kultainen ValoLux-logo ja sana VALOMAINOSPALVELU."
                className="rounded-2xl"
              />
              <figcaption className="mt-3 text-[0.8rem] text-steel-300">Pakettiauton kylki – ”Valoa yöhön”.</figcaption>
            </figure>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <figure data-reveal style={{ ['--d' as string]: 120 }}>
                <LitImage asset={media.verstas} alt="Valomainoskotelon kokoonpanoa verstaalla: alumiinirunko ja loisteputket." className="rounded-2xl" />
                <figcaption className="mt-3 text-[0.8rem] text-steel-300">Valomainoskotelon kokoonpanoa.</figcaption>
              </figure>
              <figure className="lg:w-[78%]" data-reveal style={{ ['--d' as string]: 220 }}>
                <LitImage
                  asset={media.toimipiste}
                  alt="Valoluxin toimipiste Paukkajantiellä: julkisivussa sininen VALOMAINOSPALVELU ValoLux -kyltti ja edessä pakettiauto."
                  className="rounded-2xl"
                />
                <figcaption className="mt-3 text-[0.8rem] text-steel-300">Toimipiste, Paukkajantie 4.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section-y relative bg-night-950/60" aria-labelledby="activities-title">
          <div className="light-rule absolute inset-x-0 top-0" aria-hidden="true" />
          <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Eyebrow>Mitä teemme</Eyebrow>
              <h2 id="activities-title" className="t-h2 mt-8">
                <span className="mask-line">
                  <span>Neljä työvaihetta,</span>
                </span>
                <span className="mask-line">
                  <span className="t-serif">yksi tekijä.</span>
                </span>
              </h2>
            </div>
            <ol className="lg:col-span-7 lg:col-start-6">
              {ACTIVITIES.map((a, i) => (
                <li key={a.title} className="grid gap-2 border-b border-paper/10 py-8 first:pt-0 sm:grid-cols-[4rem_1fr] sm:gap-6" data-reveal style={{ ['--d' as string]: i * 90 }}>
                  <span className="num t-label pt-3">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-none font-bold tracking-[-0.03em] [font-stretch:110%]">{a.title}</h3>
                    <p className="t-body mt-3">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-x section-y" aria-labelledby="facts-title">
          <Eyebrow>Perustiedot</Eyebrow>
          <h2 id="facts-title" className="sr-only">
            Perustiedot
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-paper/10 ring-1 ring-paper/10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {[
              ['Perustettu', String(company.founded), 'Helmikuussa'],
              ['Toimipiste', company.address.city, `${company.address.street}, ${company.address.postalCode}`],
              ['Erikoisala', 'Valo­mainokset', 'ulko- ja sisäkäyttöön'],
              ['Takuu', '1–2 vuotta', 'tuotteesta riippuen'],
            ].map(([k, v, s]) => (
              <div key={k} className="bg-night-900 p-7 sm:p-8">
                <dt className="t-label">{k}</dt>
                <dd className="mt-6">
                  <span className="block text-[clamp(1.7rem,1.35rem+1vw,2.3rem)] leading-none font-bold [hyphens:manual] tracking-[-0.03em] text-gold-100 [font-stretch:108%]">{v}</span>
                  <span className="mt-2 block text-[0.9rem] text-steel-300">{s}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-body mt-8 max-w-2xl" data-reveal>
            Toteutuksiamme löytyy muun muassa Joensuusta, Outokummusta, Pankakoskelta ja Tikkakoskelta.
          </p>
        </section>
      </div>

      <ContactCta />
    </>
  );
}
