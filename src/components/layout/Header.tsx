import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { LogoMark } from '../brand/LogoMark';
import { mainNav, quoteLink } from '../../content/navigation';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-expo',
          scrolled ? 'bg-night-900/72 shadow-[0_1px_0_rgb(239_235_227/0.07)] backdrop-blur-xl' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
          <Link to="/" className="group -ml-1 rounded-md p-1" aria-label="Valolux – etusivu">
            <LogoMark
              label={null}
              className="h-7 w-auto drop-shadow-[0_0_10px_rgb(255_180_80/0.35)] transition-[filter] duration-500 group-hover:drop-shadow-[0_0_14px_rgb(255_190_90/0.7)] lg:h-8"
            />
          </Link>

          <nav aria-label="Päävalikko" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      [
                        'group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.92rem] font-medium tracking-[0.01em] transition-colors duration-300',
                        isActive ? 'is-on text-paper' : 'text-steel-200 hover:text-paper',
                      ].join(' ')
                    }
                  >
                    <span className="led size-[5px]!" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link to={quoteLink} className="btn btn-primary btn-sm hidden sm:inline-flex">
              Pyydä tarjous
              <ArrowRight className="btn-icon size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="relative flex size-11 items-center justify-center rounded-full text-paper ring-1 ring-paper/15 transition hover:ring-gold-300/50 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Sulje valikko' : 'Avaa valikko'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-500 ease-expo ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-px bg-current transition-all duration-500 ease-expo ${menuOpen ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-3.5'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
