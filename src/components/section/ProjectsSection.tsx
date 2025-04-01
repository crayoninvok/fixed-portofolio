"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { Project } from '@/types';
import { projectsData } from '@/lib/data';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Get unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(
      projectsData.flatMap((project) => project.technologies)
    )
  );
  
  // Filter projects based on selected technology
  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((project) => 
        project.technologies.includes(activeFilter)
      );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="My Projects" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Here are some of my recent projects that showcase my skills and experience.
            Each project reflects my ability to solve complex problems and work with different technologies.
          </p>
        </FadeIn>

        {/* Filter Buttons */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {allTechnologies.map((tech: string) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tech
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project, index: number) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              View All Projects
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  // Get the first image from the images array, or use image property, or fallback to default
  const imageSource = project.images && project.images.length > 0 
    ? project.images[0] 
    : (project.image || '/images/default-project.jpg');

  return (
    <FadeIn delay={0.1 * index}>
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSource}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-primary dark:text-primary-light text-sm font-medium mb-3">
            {project.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <Link href={`/projects/${project.id}`}>
              <span className="text-primary dark:text-primary-light font-medium hover:underline">
                View Details
              </span>
            </Link>
            <div className="flex space-x-3">
              {typeof project.github === 'string' ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                  title="GitHub Repository"
                >
                  <GithubIcon />
                </a>
              ) : (
                <div className="flex space-x-2">
                  <a
                    href={project.github.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                    title="Frontend Repository"
                  >
                    <GithubIcon />
                    <span className="sr-only">Frontend</span>
                  </a>
                  <a
                    href={project.github.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                    title="Backend Repository"
                  >
                    <ServerIcon />
                    <span className="sr-only">Backend</span>
                  </a>
                </div>
              )}
              {project.link !== "On Progress" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                  title="Live Demo"
                >
                  <ExternalLinkIcon />
                </a>
              ) : (
                project.preview && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                    title="Preview Image"
                  >
                    <ImageIcon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// Icon components for better readability
const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);