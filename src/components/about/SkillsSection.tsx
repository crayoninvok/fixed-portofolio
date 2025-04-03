// src/components/about/SkillsSection.tsx
import { motion } from "framer-motion";
import FadeIn from "@/components/animation/FadeIn";

interface SkillCategory {
  category: string;
  items: string[];
}

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <FadeIn delay={0.5}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Skills & Technologies
      </h2>

      <div className="space-y-6 mb-12">
        {skills.map((skillCategory, index) => (
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
  );
}
