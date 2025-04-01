// src/app/experience/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animation/FadeIn';
import { experienceData, educationData } from '@/lib/data';

export default function ExperiencePage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Experience & Education
          </h1>
        </FadeIn>

        {/* Professional Experience Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <FadeIn delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
              Professional Experience
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {experienceData.map((experience, index) => (
              <FadeIn key={experience.id} delay={0.3 + index * 0.1} direction={index % 2 === 0 ? "right" : "left"}>
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center">
                      <div className="relative w-14 h-14 mr-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center justify-center">
                        <Image 
                          src={experience.logo} 
                          alt={experience.company}
                          width={100}
                          height={100}
                          className="object-contain max-h-10"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {experience.position.split(" ").slice(0, 1).join(" ")}
                        </h3>
                        <p className="text-primary dark:text-primary-light font-medium text-sm">
                          {experience.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-9 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {experience.position}
                    </h3>
                    <h4 className="text-lg text-primary dark:text-primary-light font-medium mb-4">
                      {experience.company}
                    </h4>
                    <div className="space-y-4">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                        {experience.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <div className="pt-4">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                          Technologies & Skills
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                              whileHover={{ y: -2, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <FadeIn delay={0.5}>
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
              Education
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {educationData.map((education, index) => (
              <FadeIn key={index} delay={0.6 + index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center">
                      <div className="relative w-14 h-14 mr-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center justify-center">
                        <Image 
                          src={education.logo} 
                          alt={education.school}
                          width={100}
                          height={100}
                          className="object-contain max-h-10"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate max-w-[180px]">
                          {education.school.split(" ").slice(0, 2).join(" ")}...
                        </h3>
                        <p className="text-primary dark:text-primary-light font-medium text-sm">
                          {education.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-9 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {education.school}
                    </h3>
                    <h4 className="text-lg text-primary dark:text-primary-light font-medium mb-4">
                      {education.degree}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {education.description}
                    </p>
                    <div className="pt-2">
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Key Courses & Focus Areas
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {education.courses.map((course, idx) => (
                          <motion.span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {course}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <FadeIn delay={0.8}>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/90 to-primary p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Interested in working together?
            </h2>
            <p className="text-white/90 mb-6">
              I'm always open to discussing new projects, opportunities, and collaborations.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-flex items-center"
                >
                  Get In Touch
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition inline-flex items-center"
                >
                  View My Projects
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}