// src/components/about/ServicesSection.tsx
import FadeIn from "@/components/animation/FadeIn";

export default function ServicesSection() {
  return (
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
            I build responsive, accessible, and performant user interfaces using
            React, Next.js, and TypeScript. I focus on creating engaging user
            experiences with smooth animations and intuitive interactions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Backend Development
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            I develop robust backend systems with Node.js, Express, and various
            databases. I design efficient APIs and ensure secure authentication
            and data handling throughout applications.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Database Design
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            I work with both SQL and NoSQL databases, designing efficient data
            models and implementing optimized queries to ensure applications
            perform well even with large datasets.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Full Stack Integration
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            I specialize in connecting all parts of an application into a
            cohesive whole, ensuring smooth data flow between frontend and
            backend while maintaining performance and security.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
