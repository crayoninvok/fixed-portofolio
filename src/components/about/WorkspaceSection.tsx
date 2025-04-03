// src/components/about/WorkspaceSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/animation/FadeIn";

export default function WorkspaceSection() {
  return (
    <FadeIn delay={0.6}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Workspace & Companion
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Workspace */}
        <div className="space-y-4">
          <div className="relative md:h-[500px] h-[400px] rounded-lg overflow-hidden shadow-lg mx-auto max-w-[350px]">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743709478/ddd64ce1-c592-4f8f-8788-068570fb9f60_j3vr4y.jpg"
                alt="My Workspace Setup"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </motion.div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              My Development Setup
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              This is where the coding magic happens. My workspace is designed
              for productivity with multiple screens for efficient workflow
              management, comfortable seating, and all the tools I need to build
              powerful web applications.
            </p>
          </div>
        </div>

        {/* Companion */}
        <div className="space-y-4">
          <div className="relative md:h-[500px] h-[400px] rounded-lg overflow-hidden shadow-lg mx-auto max-w-[350px]">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743709478/a1eae7c9-7fc8-4b83-981f-7390e52650d2_v2shhm.jpg"
                alt="Sintia - My Cat"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </motion.div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Meet Sintia, My Coding Buddy
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every developer needs a companion, and Sintia is mine. When I'm
              deep in code, she's usually nearby providing emotional support
              (and occasional keyboard contributions). She's been with me
              through countless debugging sessions and late-night coding
              sprints.
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
