import Hero from '@/components/section/Hero';
import AboutSection from '@/components/section/AboutSection';
import EducationSection from '@/components/section/EducationSection';
import ExperienceSection from '@/components/section/ExperienceSection';
import ProjectsSection from '@/components/section/ProjectsSection';
import CertificatesSection from '@/components/section/CertificatesSection';
import ContactSection from '@/components/section/ContactSection';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </div>
  );
}