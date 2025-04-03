import FadeIn from "@/components/animation/FadeIn";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <div className="max-w-5xl mx-auto mb-20">
      <FadeIn delay={0.2}>
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
          Professional Experience
        </h2>
      </FadeIn>

      <div className="space-y-12">
        {experienceData.map((experience, index) => (
          <FadeIn
            key={experience.id}
            delay={0.3 + index * 0.1}
            direction={index % 2 === 0 ? "right" : "left"}
          >
            <ExperienceCard experience={experience} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
