// components/section/AboutSection.tsx
'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { userInfo } from '@/lib/data';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* 3D Background Effect - similar to Hero but with different colors */}
      <ThreeBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="About Me" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Get to know me better - my background, skills, and what drives me as a developer.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.2}>
            <AboutImage3D />
          </FadeIn>

          <FadeIn delay={0.3} direction="left">
            <div className="space-y-6 md:pl-4 backdrop-blur-sm bg-white/5 dark:bg-black/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h3>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>{userInfo.about}</p>
                <p>
                  I believe in writing clean, maintainable code and staying up-to-date with
                  the latest industry trends and best practices. My goal is to create
                  digital experiences that are not only visually appealing but also
                  functional, accessible, and user-friendly.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge through
                  technical blog posts and community engagement.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Technical Skills
              </h3>
              
              <SkillsAnimation />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Add particles with different color than Hero
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Use different color than Hero - more purple tint
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x9c5fff,
      transparent: true,
      opacity: 0.5
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x9c5fff, 1.5);
    pointLight.position.set(-2, -3, 4);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slower rotation than hero
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect - less intense than hero
    const mouseMoveHandler = (event: { clientX: number; clientY: number }) => {
      particlesMesh.rotation.y = event.clientX * 0.00003;
      particlesMesh.rotation.x = event.clientY * 0.00003;
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseMoveHandler);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10 opacity-40" />;
}

function AboutImage3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Reset animation - gentle movement
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setRotation((prev) => {
          // If already at or close to 0, return 0 to stop animation
          if (Math.abs(prev.x) < 0.5 && Math.abs(prev.y) < 0.5) {
            return { x: 0, y: 0 };
          }
          
          // Otherwise smoothly move toward 0
          return {
            x: prev.x * 0.9,
            y: prev.y * 0.9
          };
        });
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);
  
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      if (imageRef.current && isHovered) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setRotation({
          x: (y - 0.5) * 15, // Less intense rotation than hero
          y: (x - 0.5) * -15
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);
  
  return (
    <div 
      className="relative"
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={imageRef}
        className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg transform-gpu"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-primary/20 dark:from-purple-500/30 dark:to-primary/30 z-10 rounded-lg" 
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        />
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isHovered ? "transform 0.2s ease-out" : "transform 0.8s ease-out"
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743486840/fotozaki1_ayht5l.jpg"
            alt="About Me"
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* 3D floating elements - similar style to hero but different shapes/positions */}
        <motion.div
          className="absolute top-6 right-6 w-14 h-14 bg-purple-500 rounded-full opacity-70 z-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
            rotate: [0, 8, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(30px) rotateX(${rotation.x * 1.5}deg) rotateY(${rotation.y * 1.5}deg)`,
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-primary rounded-lg opacity-70 z-20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(50px) rotateX(${rotation.x * 1.8}deg) rotateY(${rotation.y * 1.8}deg)`,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-10 h-10 bg-yellow-500 rounded-lg opacity-70 z-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(70px) rotateX(${rotation.x * 2}deg) rotateY(${rotation.y * 2}deg)`,
          }}
        />
      </motion.div>
      
      {/* Floating card with user details */}
      <motion.div
        className="absolute -bottom-10 -right-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl md:max-w-[300px] z-30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x * 0.3}deg) rotateY(${rotation.y * 0.3}deg)`,
        }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {userInfo.name}
        </h3>
        <p className="text-primary dark:text-primary-light font-medium mb-2">
          {userInfo.title}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {userInfo.location}
        </p>
        <div className="flex space-x-3">
          {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              whileHover={{ y: -3, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SocialIcon platform={platform} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SkillsAnimation() {
  return (
    <div className="space-y-4">
      {userInfo.skills.map((skillCategory, index) => (
        <div key={index}>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {skillCategory.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillCategory.items.map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx, duration: 0.5 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#5271ff",
                  color: "#ffffff"
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper component for social icons
const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      );
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    default:
      return null;
  }
};