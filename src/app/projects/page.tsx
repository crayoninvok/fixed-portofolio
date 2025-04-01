// src/app/projects/page.tsx - With TypeScript error fixes
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animation/FadeIn';
import { projectsData } from '@/lib/data';
import { Project } from '@/types';

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
const isGithubObject = (github: string | { frontend: string; backend: string }): 
  github is { frontend: string; backend: string } => {
  return typeof github !== 'string';
};

// Component for image gallery preview
const ImageGallery = ({ project, title }: { project: Project; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get all images for this project
  const images = getProjectImages(project);
  
  // If there are no images, show a placeholder
  if (images.length === 0) {
    return (
      <div className="relative h-full w-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">No images available</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors z-10"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
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
const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
  // Determine if github is a string or object to handle link rendering
  const hasMultipleRepos = isGithubObject(project.github);
  
  // Alternate layout direction based on index
  const isEven = index % 2 === 0;
  
  return (
    <section id={`project-${project.id}`} className="min-h-screen py-24 flex items-center">
      <div className="container mx-auto px-4">
        <FadeIn delay={0.1} direction={isEven ? "right" : "left"}>
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>
            {/* Project Image Gallery */}
            <div className={`h-[500px] relative rounded-xl overflow-hidden shadow-xl ${isEven ? 'md:order-1' : 'md:order-2'}`}>
              <ImageGallery 
                project={project}
                title={project.title} 
              />
              
              {/* Project Links Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex justify-center space-x-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {/* Live Site Button */}
                {project.link !== "On Progress" ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
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
                      href={isGithubObject(project.github) ? project.github.frontend : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Frontend Code
                    </a>
                    <a 
                      href={isGithubObject(project.github) ? project.github.backend : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Backend Code
                    </a>
                  </>
                ) : (
                  <a 
                    href={typeof project.github === 'string' ? project.github : '#'} 
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
            <div className={`space-y-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
              <div>
                <span className="text-primary dark:text-primary-light font-medium">
                  Project {index + 1}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1 mb-2">
                  {project.title}
                </h2>
                <h3 className="text-xl md:text-2xl text-primary dark:text-primary-light font-medium mb-6">
                  {project.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              
              {/* Technologies */}
              <div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Project Links for Mobile */}
              <div className="md:hidden flex flex-wrap gap-4 mt-8">
                {/* Live Site Button */}
                {project.link !== "On Progress" ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
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
                      href={isGithubObject(project.github) ? project.github.frontend : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Frontend Code
                    </a>
                    <a 
                      href={isGithubObject(project.github) ? project.github.backend : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                    >
                      Backend Code
                    </a>
                  </>
                ) : (
                  <a 
                    href={typeof project.github === 'string' ? project.github : '#'} 
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

// Project navigation component
const ProjectNavigation = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="space-y-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-2 rounded-full">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className="block w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary-light transition-colors"
            aria-label={`Navigate to ${project.title}`}
            data-tooltip={project.title}
          />
        ))}
      </div>
    </div>
  );
};

// Main Projects Page Component
export default function ProjectsPage() {
  return (
    <main className="relative">
      {/* Header Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 text-center z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Explore my portfolio of web development projects that showcase my skills and expertise.
            </p>
            <motion.a
              href="#project-1"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
              <svg className="ml-2 h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </FadeIn>
        </div>
      </section>

      {/* Navigation Dots */}
      <ProjectNavigation projects={projectsData} />
      
      {/* Project Sections */}
      {projectsData.map((project, index) => (
        <ProjectSection 
          key={project.id} 
          project={project} 
          index={index} 
        />
      ))}
      
      {/* Call to Action */}
      <section className="py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Interested in collaborating?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-4 rounded-md font-medium hover:bg-primary-dark transition-colors inline-flex items-center text-lg"
                >
                  Get In Touch
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}