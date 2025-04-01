// components/section/EducationSection.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { educationData } from '@/lib/data';
import { Education } from '@/types';

export default function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="Education" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            My academic journey and learning experiences that have shaped my skills and knowledge.
          </p>
        </FadeIn>

        <div className="space-y-12 max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ education, index }: { education: Education; index: number }) {
  return (
    <FadeIn delay={0.2 * index} direction={index % 2 === 0 ? "right" : "left"}>
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700 md:w-1/4">
            <div className="relative w-32 h-32">
              <Image
                src={education.logo}
                alt={`${education.school} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {education.school}
                </h3>
                <p className="text-primary dark:text-primary-light font-medium">
                  {education.degree}
                </p>
              </div>
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                {education.duration}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {education.description}
            </p>
            
            {education.courses && (
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Key Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course: string, idx: number) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}