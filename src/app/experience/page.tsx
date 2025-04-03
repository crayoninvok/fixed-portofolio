// src/app/experience/page.tsx
"use client";

import FadeIn from "@/components/animation/FadeIn";
import ExperienceSection from "@/components/experience/ExperienceSection";
import EducationSection from "@/components/experience/EducationSection";
import CallToAction from "@/components/experience/CallToAction";

export default function ExperiencePage() {
  return (
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Experience & Education
          </h1>
        </FadeIn>

        {/* Professional Experience Section */}
        <ExperienceSection />

        {/* Education Section */}
        <EducationSection />

        {/* Call-to-Action Section */}
        <CallToAction />
      </div>
    </main>
  );
}
