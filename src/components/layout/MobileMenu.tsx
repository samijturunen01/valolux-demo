import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { Phone } from 'lucide-react';
import { mainNav, quoteLink } from '../../content/navigation';
import { company } from '../../content/company';

type Props = { open: boolean; onClose: () => void };

/** Full-screen navigation drawer for small screens: focus-trapped, Esc closes, page behind is inert. */
export function MobileMenu({ open, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.getElementById('main');
    const footer = document.getElementById('site-footer');
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    const first = panel.current?.querySelector<HTMLElement>('a, button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const focusables = [...panel.current.querySelectorAll<HTMLElement>('a, button')];
      const header = document.querySelector<HTMLElement>('header button[aria-controls="mobile-menu"]');
      if (header) focusables.unshift(header);
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Valikko"
      hidden={!open}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night-950/96 px-[clamp(1.25rem,4.2vw,3.75rem)] pt-28 pb-10 backdrop-blur-2xl lg:hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_170_70/0.16),transparent)]"
      />
      <nav aria-label="Mobiilivalikko" className="relative">
        <ul className="flex flex-col">
          {mainNav.map((item, i) => (
            <li key={item.to} className="animate-[page-in_0.8s_var(--ease-expo)_both]" style={{ animationDelay: `${80 + i * 55}ms` }}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-4 border-b border-paper/8 py-4 text-[2rem] leading-none font-bold tracking-[-0.03em] [font-stretch:108%] ${isActive ? 'is-on text-gold-100' : 'text-paper'}`
                }
              >
                <span className="led" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative mt-auto pt-10">
        <NavLink to={quoteLink} className="btn btn-primary w-full">
          Pyydä tarjous
        </NavLink>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {company.phones.map((p) => (
            <a key={p.href} href={p.href} className="btn btn-ghost btn-sm w-full">
              <Phone className="size-4" aria-hidden="true" />
              <span className="num">{p.label}</span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-steel-300">
          {company.address.street}, {company.address.postalCode} {company.address.city}
        </p>
      </div>
    </div>
  );
}
