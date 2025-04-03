// src/app/projects/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/animation/FadeIn";
import { projectsData } from "@/lib/data";
import { Project } from "@/types";
import MaritimeTechAnimation, {
  MaritimeTechUI,
} from "@/components/animation/MaritimeTechAnimation";

// Helper function to get all images for a project (works with both old and new structure)
const getProjectImages = (project: Project): string[] => {
  // If the project has the new 'images' array with content, use it
  if (project.images && project.images.length > 0) {
    return project.images;
  }

  // Fall back to the old structure if needed
  const images: string[] = [];
  if (project.image) {
    images.push(project.image);
  }
  if (project.preview) {
    images.push(project.preview);
  }
  return images;
};

// Type guard to check if github is an object with frontend and backend
const isGithubObject = (
  github: string | { frontend: string; backend: string }
): github is { frontend: string; backend: string } => {
  return typeof github !== "string";
};

// Component for image gallery preview
const ImageGallery = ({
  project,
  title,
}: {
  project: Project;
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get all images for this project
  const images = getProjectImages(project);

  // If there are no images, show a placeholder
  if (images.length === 0) {
    return (
      <div className="relative h-full w-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          No images available
        </span>
      </div>
    );
  }

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      <Image
        src={images[currentIndex]}
        alt={`${title} - Preview ${currentIndex + 1}`}
        fill
        className="object-cover"
        priority={currentIndex === 0}
      />

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors z-10"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors z-10"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm rounded-full px-3 py-1 z-10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Component for a full-section project
const ProjectSection = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  // Determine if github is a string or object to handle link rendering
  const hasMultipleRepos = isGithubObject(project.github);

  // Alternate layout direction based on index
  const isEven = index % 2 === 0;

  return (
    <section
      id={`project-${project.id}`}
      className="min-h-screen py-24 flex items-center relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn delay={0.1} direction={isEven ? "right" : "left"}>
          <div
            className={`grid md:grid-cols-2 gap-12 items-center ${
              isEven ? "" : "md:grid-flow-dense"
            }`}
          >
            {/* Project Image Gallery */}
            <div
              className={`h-[500px] relative rounded-xl overflow-hidden shadow-xl ${
                isEven ? "md:order-1" : "md:order-2"
              } group`}
            >
              <motion.div
                className="absolute inset-0 z-20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ImageGallery project={project} title={project.title} />
              </motion.div>

              {/* Maritime-themed glowing border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

              {/* Project Links Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex justify-center space-x-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
                {/* Live Site Button */}
                {project.link !== "On Progress" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition-colors"
                  >
                    View Live Site
                  </a>
                ) : (
                  <span className="bg-gray-200 text-gray-600 px-6 py-3 rounded-md font-medium cursor-not-allowed">
                    In Progress
                  </span>
                )}

                {/* GitHub Button(s) */}
                {hasMultipleRepos ? (
                  <>
                    <a
                      href={
                        isGithubObject(project.github)
                          ? project.github.frontend
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Frontend Code
                    </a>
                    <a
                      href={
                        isGithubObject(project.github)
                          ? project.github.backend
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Backend Code
                    </a>
                  </>
                ) : (
                  <a
                    href={
                      typeof project.github === "string" ? project.github : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div
              className={`space-y-6 ${isEven ? "md:order-2" : "md:order-1"}`}
            >
              <div className="relative backdrop-blur-sm bg-white/5 dark:bg-black/5 p-6 rounded-xl border border-blue-500/20 dark:border-cyan-500/20">
                {/* Technical specs background element */}
                <div className="absolute -right-2 -top-2 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-md"></div>

                {/* Project title with marine-tech styling */}
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono uppercase text-sm tracking-wider">
                      Project {index + 1}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-2">
                    {project.title}
                  </h2>
                  <h3 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6 border-b border-blue-500/30 pb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Technologies with maritime styling */}
                <div className="pt-4">
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 dark:text-cyan-300 rounded-md text-sm font-medium border border-blue-500/20 dark:border-cyan-500/20"
                        whileHover={{
                          y: -5,
                          scale: 1.05,
                          boxShadow: "0 0 15px rgba(6, 182, 212, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Links for Mobile - Maritime styled */}
              <div className="md:hidden flex flex-wrap gap-4 mt-8">
                {/* Live Site Button */}
                {project.link !== "On Progress" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Live Site
                  </a>
                ) : (
                  <span className="bg-gray-200 text-gray-600 px-6 py-3 rounded-md font-medium cursor-not-allowed">
                    In Progress
                  </span>
                )}

                {/* GitHub Button(s) */}
                {hasMultipleRepos ? (
                  <>
                    <a
                      href={
                        isGithubObject(project.github)
                          ? project.github.frontend
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Frontend Code
                    </a>
                    <a
                      href={
                        isGithubObject(project.github)
                          ? project.github.backend
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Backend Code
                    </a>
                  </>
                ) : (
                  <a
                    href={
                      typeof project.github === "string" ? project.github : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Project navigation component with maritime-themed navigation
const ProjectNavigation = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="space-y-3 bg-blue-900/20 dark:bg-blue-900/30 backdrop-blur-md p-3 rounded-lg border border-blue-500/30">
        <div className="text-xs text-blue-500 dark:text-blue-400 font-mono text-center mb-2">
          NAVIGATION
        </div>
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={`#project-${project.id}`}
            className="relative block w-4 h-4 rounded-full bg-blue-300/40 dark:bg-blue-400/30 hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors group"
            whileHover={{
              scale: 1.2,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label={`Navigate to ${project.title}`}
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-blue-900/80 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {project.name}
            </span>

            {/* Pulsing indicator for active projects */}
            <span className="absolute inset-0 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-30 animate-ping"></span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// Main Projects Page Component
export default function ProjectsPage() {
  return (
    <main className="relative">
      {/* Header Section with maritime tech animation */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Maritime tech animation background */}
        <MaritimeTechAnimation />

        {/* UI elements overlay */}
        <MaritimeTechUI />

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <motion.div
              className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-400 dark:text-blue-300 font-mono tracking-wider text-sm">
                PORTFOLIO NAVIGATOR
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 backdrop-blur-sm bg-white/5 dark:bg-black/5 p-4 rounded-lg">
              Explore my portfolio showcasing web development and maritime
              technology projects that blend digital innovation with my
              background in vessel systems.
            </p>
            <motion.a
              href="#project-1"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors border border-blue-400/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
              <svg
                className="ml-2 h-6 w-6 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.a>
          </FadeIn>

          {/* Maritime radar circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border-2 border-cyan-500/30 -z-10"
            style={{
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(14,116,144,0.05) 50%, rgba(0,0,0,0) 70%)",
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {/* Radar sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-400/20"
              style={{
                clipPath:
                  "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Navigation Dots */}
      <ProjectNavigation projects={projectsData} />

      {/* Project Sections */}
      {projectsData.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* Call to Action with Maritime Theme */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 relative overflow-hidden">
        {/* Ocean wave effect */}
        <div className="absolute inset-x-0 bottom-0 h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 text-blue-400/20 dark:text-blue-600/20"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,224L40,229.3C80,235,160,245,240,240C320,235,400,213,480,181.3C560,149,640,107,720,112C800,117,880,171,960,197.3C1040,224,1120,224,1200,213.3C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 text-blue-300/30 dark:text-blue-500/30 animate-wave"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 border-2 border-blue-500/30 dark:border-blue-400/30 p-px rounded-xl">
                <div className="bg-blue-50 dark:bg-blue-900/50 px-6 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-blue-600 dark:text-blue-300 font-mono tracking-wider text-sm">
                    COMMUNICATION CHANNEL
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Interested in collaborating?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 backdrop-blur-sm bg-white/30 dark:bg-black/20 p-4 rounded-lg">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to combine maritime expertise with web development
                solutions.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center text-lg group border border-blue-400/20"
                >
                  Establish Contact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </Link>

              {/* Signal beacon animation */}
              <div className="mt-16 relative h-8">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
                  <div className="relative flex justify-center">
                    <div className="w-1 h-8 bg-blue-600/30 dark:bg-blue-400/30"></div>
                    <div className="absolute bottom-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="absolute bottom-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
