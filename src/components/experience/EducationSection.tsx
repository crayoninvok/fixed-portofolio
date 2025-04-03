import FadeIn from "@/components/animation/FadeIn";
import EducationCard from "./EducationCard";
import { educationData } from "@/lib/data";

export default function EducationSection() {
  return (
    <div className="max-w-5xl mx-auto mb-12">
      <FadeIn delay={0.5}>
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
          Education
        </h2>
      </FadeIn>

      <div className="space-y-12">
        {educationData.map((education, index) => (
          <FadeIn
            key={index}
            delay={0.6 + index * 0.1}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <EducationCard education={education} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
