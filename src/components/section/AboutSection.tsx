// components/section/AboutSection.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { userInfo } from '@/lib/data';

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="About Me" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Get to know me better - my background, skills, and what drives me as a developer.
          </p>
        </FadeIn>

        {/* Increased gap between columns from gap-10 to gap-16 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.2}>
            <div className="relative">
              <motion.div
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743486840/fotozaki1_ayht5l.jpg" // Replace with your image
                  alt="About Me"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Floating card with user details */}
              <motion.div
                className="absolute -bottom-10 -right-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl md:max-w-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {userInfo.name}
                </h3>
                <p className="text-primary dark:text-primary-light font-medium mb-2">
                  {userInfo.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {userInfo.location}
                </p>
                <div className="flex space-x-3">
                  {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Added pl-4 for additional padding on the left side of the right section */}
          <FadeIn delay={0.3} direction="left">
            <div className="space-y-6 md:pl-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h3>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{userInfo.about}</p>
                <p>
                  I believe in writing clean, maintainable code and staying up-to-date with
                  the latest industry trends and best practices. My goal is to create
                  digital experiences that are not only visually appealing but also
                  functional, accessible, and user-friendly.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge through
                  technical blog posts and community engagement.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Technical Skills
              </h3>
              
              <div className="space-y-4">
                {userInfo.skills.map((skillCategory, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {skillCategory.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Helper component for social icons
const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      );
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    default:
      return null;
  }
};