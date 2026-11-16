import { useRef, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { company } from '../content/company';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-paper/10 py-10" data-reveal>
      <h2 className="t-h3">{title}</h2>
      <div className="t-body mt-4 space-y-3">{children}</div>
    </section>
  );
}

const Todo = ({ children }: { children: ReactNode }) => (
  <span className="rounded bg-volt/10 px-1.5 py-0.5 text-[0.92em] text-volt ring-1 ring-volt/30">[{children}]</span>
);

/** DRAFT privacy notice for the contact form. Must be completed and reviewed before launch. */
export default function PrivacyPage() {
  useDocumentMeta('/tietosuoja');
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  return (
    <>
      <PageHero eyebrow="Tietosuoja" title="Tietosuojaseloste" lead="Yhteydenotto- ja tarjouspyyntölomakkeen henkilötietojen käsittely." />
      <div ref={root} className="container-x max-w-4xl pb-32">
        <div className="mb-6 flex gap-3 rounded-2xl bg-volt/[0.06] p-5 text-[0.95rem] text-steel-200 ring-1 ring-volt/30" role="note">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-volt" aria-hidden="true" />
          <p>
            <strong className="text-paper">Luonnos.</strong> Tämä seloste on demosivuston pohja. Hakasulkeissa olevat
            kohdat täydennetään ja koko teksti tarkistetaan ennen sivuston julkaisua. Demolomake ei lähetä eikä tallenna
            tietoja.
          </p>
        </div>

        <Block title="1. Rekisterinpitäjä">
          <p>
            {company.name} (Y-tunnus {company.businessId})
            <br />
            {company.address.street}, {company.address.postalCode} {company.address.city}
            <br />
            Puh. {company.phones[0].label}, {company.email}
          </p>
        </Block>
        <Block title="2. Yhteyshenkilö tietosuoja-asioissa">
          <p>
            <Todo>nimi ja yhteystiedot</Todo>
          </p>
        </Block>
        <Block title="3. Käsittelyn tarkoitus ja oikeusperuste">
          <p>Lomakkeella annettuja tietoja käsitellään yhteydenotto- ja tarjouspyyntöihin vastaamiseksi.</p>
          <p>
            Oikeusperuste: <Todo>esim. rekisteröidyn pyynnöstä tehtävät sopimusta edeltävät toimenpiteet / oikeutettu etu</Todo>
          </p>
        </Block>
        <Block title="4. Käsiteltävät tiedot">
          <p>Nimi, yritys, sähköpostiosoite, puhelinnumero, kiinnostava palvelu, mainoksen arvioidut mitat sekä viestin sisältö.</p>
        </Block>
        <Block title="5. Tietojen vastaanottajat ja käsittelijät">
          <p>
            Lomakkeen tiedot välitetään Google Apps Script -palvelun kautta <Todo>sähköpostiin / taulukkoon</Todo>.
            Roskapostin torjuntaan käytetään Google reCAPTCHA -palvelua. Google voi käsitellä tietoja myös EU:n ja ETA:n
            ulkopuolella <Todo>siirtoperuste ja linkki Googlen tietosuojakäytäntöön</Todo>.
          </p>
        </Block>
        <Block title="6. Säilytysaika">
          <p>
            <Todo>esim. tiedot poistetaan, kun yhteydenotto on käsitelty, ellei asiakassuhdetta synny</Todo>
          </p>
        </Block>
        <Block title="7. Rekisteröidyn oikeudet">
          <p>
            Sinulla on oikeus saada pääsy tietoihisi, pyytää niiden oikaisemista tai poistamista, rajoittaa käsittelyä ja
            vastustaa käsittelyä. Voit myös tehdä valituksen tietosuojavaltuutetun toimistolle (tietosuoja.fi).
          </p>
        </Block>
        <Block title="8. Evästeet">
          <p>
            <Todo>päivitetään, kun analytiikka- ja reCAPTCHA-ratkaisut on päätetty</Todo>
          </p>
        </Block>
      </div>
    </>
  );
}
