import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DemoBadge } from './components/layout/DemoBadge';
import { RouteVeil } from './components/layout/RouteVeil';
import { PointerLight } from './components/layout/PointerLight';
import { ScrollManager } from './components/layout/ScrollManager';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const location = useLocation();
  const previous = useRef(location.pathname);
  const [navigations, setNavigations] = useState(0);

  // Count real page changes (not the first render, not StrictMode re-runs) to drive the transition veil
  useEffect(() => {
    if (previous.current === location.pathname) return;
    previous.current = location.pathname;
    setNavigations((n) => n + 1);
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-gold-300 px-5 py-3 font-semibold text-night-900"
      >
        Siirry sisältöön
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
          <div key={location.pathname} className={navigations > 0 ? 'animate-[page-in_0.9s_0.25s_var(--ease-expo)_both]' : undefined}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/palvelut" element={<ServicesPage />} />
              <Route path="/toteutukset" element={<ProjectsPage />} />
              <Route path="/yritys" element={<AboutPage />} />
              <Route path="/yhteystiedot" element={<ContactPage />} />
              <Route path="/tietosuoja" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
      {navigations > 0 && <RouteVeil key={navigations} />}
      <ScrollManager />
      <PointerLight />
      <DemoBadge />
    </>
  );
}
