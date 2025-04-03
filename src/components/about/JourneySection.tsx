// src/components/about/JourneySection.tsx
import FadeIn from "@/components/animation/FadeIn";

export default function JourneySection() {
  return (
    <FadeIn delay={0.4}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Journey
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-12">
        <p>
          My professional journey began in the maritime industry where I
          specialized in marine electrical systems. Working on complex
          electrical installations aboard vessels developed my systematic
          problem-solving approach and attention to detail—skills that have
          proven invaluable in my transition to software development.
        </p>
        <p>
          The decision to pivot to web development came from my growing interest
          in creating digital solutions and the realization that my technical
          mindset could be effectively applied to building software. I immersed
          myself in learning modern web technologies, starting with HTML, CSS,
          and JavaScript, and eventually mastering React, Next.js, and backend
          technologies.
        </p>
        <p>
          My engineering background has given me a unique edge in approaching
          web development challenges methodically, while maintaining a focus on
          efficiency and reliability—similar to how maritime systems must
          operate.
        </p>
      </div>
    </FadeIn>
  );
}
