import { Hero } from '../components/home/Hero';
import { Intro } from '../components/home/Intro';
import { ServicesShowcase } from '../components/home/ServicesShowcase';
import { SelectedProjects } from '../components/home/SelectedProjects';
import { Process } from '../components/home/Process';
import { AboutTeaser } from '../components/home/AboutTeaser';
import { ContactCta } from '../components/home/ContactCta';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function HomePage() {
  useDocumentMeta('/');
  return (
    <>
      <Hero />
      <Intro />
      <ServicesShowcase />
      <SelectedProjects />
      <Process />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
