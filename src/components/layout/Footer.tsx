import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { LogoMark } from '../brand/LogoMark';
import { company } from '../../content/company';
import { mainNav } from '../../content/navigation';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-paper/8 bg-night-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[70rem] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_170_70/0.08),transparent)]"
      />
      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoMark className="h-12 w-auto drop-shadow-[0_0_18px_rgb(255_180_80/0.35)] lg:h-14" label="Valolux" />
            <p className="t-serif mt-6 text-[2rem] leading-none">{company.slogan}</p>
            <p className="t-body mt-5 max-w-sm text-[0.95rem]">
              Valomainosten suunnittelu, valmistus, asennus ja huolto Joensuussa vuodesta {company.founded}.
            </p>
          </div>

          <nav aria-label="Alavalikko" className="lg:col-span-2">
            <h2 className="t-label mb-5">Sivut</h2>
            <ul className="space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-steel-200 transition-colors hover:text-gold-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label mb-5">Yhteystiedot</h2>
            <address className="space-y-2.5 not-italic text-steel-200">
              <p>
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <p className="flex flex-col">
                {company.phones.map((p) => (
                  <a key={p.href} href={p.href} className="num w-fit transition-colors hover:text-gold-100">
                    {p.label}
                  </a>
                ))}
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-gold-100">
                  {company.email}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label mb-5">Yritys</h2>
            <dl className="space-y-2.5 text-steel-200">
              <div>
                <dt className="sr-only">Virallinen nimi</dt>
                <dd>{company.name}</dd>
              </div>
              <div>
                <dt className="inline">Y-tunnus </dt>
                <dd className="num inline">{company.businessId}</dd>
              </div>
              <div>
                <dt className="inline">Perustettu </dt>
                <dd className="inline">{company.founded}</dd>
              </div>
            </dl>
            <a
              href={company.promoShopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-steel-300 transition-colors hover:text-gold-100"
            >
              Mainostuotteet-verkkomallisto
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(avautuu uuteen välilehteen)</span>
            </a>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col gap-4 text-[0.8rem] text-steel-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/tietosuoja" className="transition-colors hover:text-gold-100">
              Tietosuojaseloste
            </Link>
            <span className="inline-flex items-center gap-2">
              <span className="led led-volt is-on" aria-hidden="true" />
              Konseptidemo – ei yrityksen virallinen verkkosivusto
            </span>
          </p>
        </div>
      </div>

      {/* Monumental, barely-lit wordmark as the final image of every page */}
      <div aria-hidden="true" className="pointer-events-none relative -mb-[3vw] select-none overflow-hidden">
        <LogoMark
          label={null}
          className="mx-auto w-[min(1500px,104vw)] translate-y-[22%] opacity-[0.07] [mask-image:linear-gradient(to_bottom,#000_35%,transparent_85%)]"
        />
      </div>
    </footer>
  );
}
