'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { experienceData } from '@/lib/data';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="Work Experience" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            My professional journey through various roles and companies, showcasing
            my growth and expertise in web development and software engineering.
          </p>
        </FadeIn>

        {/* Mobile View - Stacked Layout */}
        <div className="md:hidden">
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex whitespace-nowrap">
              {experienceData.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(index)}
                  className={`py-3 px-4 text-left min-w-max border-b-2 transition-all flex items-center ${
                    activeTab === index
                      ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light font-medium'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <div className="relative h-8 w-8 mr-3 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-sm">{exp.company}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative h-16 w-16 mb-3 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={experienceData[activeTab].logo}
                      alt={`${experienceData[activeTab].company} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experienceData[activeTab].position}
                    </h3>
                    <p className="text-primary dark:text-primary-light">
                      {experienceData[activeTab].company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {experienceData[activeTab].duration}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6 pl-5">
                  {experienceData[activeTab].description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary dark:text-primary-light mr-2 flex-shrink-0">▹</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm break-words">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experienceData[activeTab].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 max-w-4xl mx-auto">
          {/* Company Tabs */}
          <FadeIn delay={0.2} className="col-span-4">
            <div className="flex flex-col">
              {experienceData.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(index)}
                  className={`py-3 px-4 text-left border-l-2 transition-all flex items-center ${
                    activeTab === index
                      ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light font-medium'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <div className="relative h-8 w-8 mr-3 flex-shrink-0 bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span>{exp.company}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Experience Details */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FadeIn delay={0.3}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-start mb-4">
                      <div className="relative h-16 w-16 mr-4 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={experienceData[activeTab].logo}
                          alt={`${experienceData[activeTab].company} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white break-words">
                          {experienceData[activeTab].position}
                        </h3>
                        <p className="text-primary dark:text-primary-light">
                          {experienceData[activeTab].company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {experienceData[activeTab].duration}
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6 pl-5">
                      {experienceData[activeTab].description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary dark:text-primary-light mr-2 flex-shrink-0">▹</span>
                          <span className="text-gray-700 dark:text-gray-300 break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {experienceData[activeTab].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}