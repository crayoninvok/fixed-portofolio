// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animation/FadeIn";
import { userInfo } from "@/lib/data";
import ProfileSection from "@/components/about/ProfileSelection";
import SkillsMarquee from "@/components/about/SkillsMarquee";
import SkillsSection from "@/components/about/SkillsSection";
import JourneySection from "@/components/about/JourneySection";
import ServicesSection from "@/components/about/ServiceSection";
import WorkspaceSection from "@/components/about/WorkspaceSection";

// Skill data for the marquee
import { skillsWithLogos } from "@/components/about/skillsData";

export default function AboutPage() {
  return (
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            About Me
          </h1>
        </FadeIn>

        {/* Profile & Bio Section */}
        <ProfileSection />

        {/* Enhanced Skills Marquee */}
        <SkillsMarquee skills={skillsWithLogos} />

        <div className="max-w-5xl mx-auto">
          {/* My Journey Section */}
          <JourneySection />

          {/* Skills & Technologies Section */}
          <SkillsSection skills={userInfo.skills} />

          {/* What I Do Section */}
          <ServicesSection />

          {/* Workspace & Cat Section */}
          <WorkspaceSection />

          {/* Contact Button */}
          <FadeIn delay={0.7}>
            <div className="text-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition inline-flex items-center"
                >
                  Get In Touch
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
