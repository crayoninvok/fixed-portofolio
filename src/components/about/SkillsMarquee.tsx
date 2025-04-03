// src/components/about/SkillsMarquee.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Define the Skill interface for the enhanced marquee
export interface Skill {
  id: string;
  name: string;
  logo: string;
  category?: string;
}

export default function SkillsMarquee({ skills }: { skills: Skill[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Animation variants for the items appearing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
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
