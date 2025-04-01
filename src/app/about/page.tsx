// src/app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animation/FadeIn';
import { userInfo } from '@/lib/data';
import { useRef } from 'react';

// Define the Skill interface for the enhanced marquee
interface Skill {
  id: string;
  name: string;
  logo: string;
  category?: string;
}

// Enhanced skills marquee component with logos and animations
function EnhancedSkillsMarquee({ skills }: { skills: Skill[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Animation variants for the items appearing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800 py-6 my-12 rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative whitespace-nowrap inline-flex marquee-container">
        <div ref={marqueeRef} className="flex animate-marquee">
          {skills.map((skill) => (
            <motion.div 
              key={`${skill.id}`} 
              className="mx-4 flex items-center"
              variants={itemVariants}
            >
              <div className="w-8 h-8 relative mr-2 bg-white dark:bg-gray-700 rounded-full p-1 flex items-center justify-center shadow-sm">
                <Image 
                  src={skill.logo} 
                  alt={`${skill.name} logo`}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-primary dark:text-primary-light">
                {skill.name}
              </span>
              <span className="text-gray-400 mx-2">•</span>
            </motion.div>
          ))}
        </div>
        <div className="flex animate-marquee2 absolute top-0 left-0">
          {skills.map((skill) => (
            <motion.div 
              key={`${skill.id}-duplicate`} 
              className="mx-4 flex items-center"
              variants={itemVariants}
            >
              <div className="w-8 h-8 relative mr-2 bg-white dark:bg-gray-700 rounded-full p-1 flex items-center justify-center shadow-sm">
                <Image 
                  src={skill.logo} 
                  alt={`${skill.name} logo`}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-primary dark:text-primary-light">
                {skill.name}
              </span>
              <span className="text-gray-400 mx-2">•</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Original SkillsMarquee component (you can keep this for backward compatibility if needed)
function SkillsMarquee({ skills }: { skills: string[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800 py-6 my-12">
      <div className="relative whitespace-nowrap inline-flex marquee-container">
        <div ref={marqueeRef} className="flex animate-marquee">
          {skills.map((skill: string, index: number) => (
            <div 
              key={`${skill}-${index}`} 
              className="mx-4 text-xl md:text-2xl font-bold text-primary dark:text-primary-light"
            >
              {skill} <span className="text-gray-400 mx-2">•</span>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee2 absolute top-0 left-0">
          {skills.map((skill: string, index: number) => (
            <div 
              key={`${skill}-duplicate-${index}`} 
              className="mx-4 text-xl md:text-2xl font-bold text-primary dark:text-primary-light"
            >
              {skill} <span className="text-gray-400 mx-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  // List of primary skills for the original marquee (keep if needed)
  const primarySkills: string[] = [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Tailwind CSS',
    'RESTful APIs',
    'MongoDB',
    'Git',
    'Responsive Design',
    'Marine Electronics'
  ];

  // Create enhanced skills with logos for the new marquee
  const skillsWithLogos: Skill[] = [
    {
      id: 'nextjs',
      name: 'Next.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      category: 'Frontend'
    },
    {
      id: 'react',
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frontend'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      category: 'Language'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'Backend'
    },
    {
      id: 'express',
      name: 'Express',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      category: 'Backend'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      category: 'Database'
    },
    {
      id: 'tailwindcss',
      name: 'Tailwind CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      category: 'Frontend'
    },
    {
      id: 'restapi',
      name: 'RESTful APIs',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg',
      category: 'Backend'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'Database'
    },
    {
      id: 'git',
      name: 'Git',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'DevOps'
    },
    {
      id: 'responsive',
      name: 'Responsive Design',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      category: 'Frontend'
    },
    {
      id: 'marine',
      name: 'Marine Electronics',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
      category: 'Other'
    }
  ];

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            About Me
          </h1>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
          <FadeIn delay={0.2}>
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743486840/fotozaki1_ayht5l.jpg"
                alt="Dzaky Athariq Ferreira"
                fill
                className="object-cover"
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3} direction="left">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dzaky Athariq Ferreira
              </h2>
              <h3 className="text-xl text-primary dark:text-primary-light font-medium">
                Full Stack Developer
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300">
                I am a passionate full stack developer who transitioned from a career in marine electrical systems, bringing a unique technical perspective to web development. I specialize in building modern web applications using Next.js, React, and TypeScript.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                I enjoy creating responsive, accessible, and performant web experiences that solve real-world problems. With a strong foundation in both frontend and backend technologies, combined with my background in maritime systems, I strive to deliver high-quality code and exceptional user experiences that blend technical precision with creative solutions.
              </p>
              
              <div className="pt-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                      aria-label={platform}
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Enhanced Skills Marquee with logos (replace the original) */}
        <EnhancedSkillsMarquee skills={skillsWithLogos} />

        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.4}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              My Journey
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-12">
              <p>
                My professional journey began in the maritime industry where I specialized in marine electrical systems. Working on complex electrical installations aboard vessels developed my systematic problem-solving approach and attention to detail—skills that have proven invaluable in my transition to software development.
              </p>
              <p>
                The decision to pivot to web development came from my growing interest in creating digital solutions and the realization that my technical mindset could be effectively applied to building software. I immersed myself in learning modern web technologies, starting with HTML, CSS, and JavaScript, and eventually mastering React, Next.js, and backend technologies.
              </p>
              <p>
                My engineering background has given me a unique edge in approaching web development challenges methodically, while maintaining a focus on efficiency and reliability—similar to how maritime systems must operate.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            
            <div className="space-y-6 mb-12">
              {userInfo.skills.map((skillCategory, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
                        whileHover={{ y: -5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              What I Do
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Frontend Development
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I build responsive, accessible, and performant user interfaces using React, Next.js, and TypeScript. I focus on creating engaging user experiences with smooth animations and intuitive interactions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Backend Development
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I develop robust backend systems with Node.js, Express, and various databases. I design efficient APIs and ensure secure authentication and data handling throughout applications.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Database Design
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I work with both SQL and NoSQL databases, designing efficient data models and implementing optimized queries to ensure applications perform well even with large datasets.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Full Stack Integration
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I specialize in connecting all parts of an application into a cohesive whole, ensuring smooth data flow between frontend and backend while maintaining performance and security.
                </p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <div className="text-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition inline-flex items-center"
                >
                  Get In Touch
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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