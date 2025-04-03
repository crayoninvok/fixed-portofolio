'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import AnimatedText from '../animation/AnimatedText';
import FadeIn from '../animation/FadeIn';

// Define types for mouse events
type MouseEvent = {
  clientX: number;
  clientY: number;
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <ThreeBackground />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
        <HeroContent />
        <HeroImage3D />
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
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x5271ff,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x5271ff, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Mouse interaction
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
    
    // Mouse movement effect
    const mouseMoveHandler = (event: MouseEvent) => {
      particlesMesh.rotation.y = event.clientX * 0.00005;
      particlesMesh.rotation.x = event.clientY * 0.00005;
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', mouseMoveHandler);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}

function HeroContent() {
  return (
    <FadeIn delay={0.2}>
      <div className="space-y-6 backdrop-blur-sm bg-white/5 dark:bg-black/5 p-8 rounded-2xl">
        <motion.div 
          className="text-sm font-medium text-primary dark:text-primary-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to my portfolio
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm Dzaky Athariq Ferreira
        </motion.h1>
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A Full Stack Web Developer specialized in Next.js & TypeScript
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I create beautiful, interactive, and responsive web applications with
          modern technologies. Let's build something amazing together.
        </motion.p>
        <HeroButtons />
      </div>
    </FadeIn>
  );
}

function HeroButtons() {
  return (
    <motion.div 
      className="flex space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(82, 113, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition duration-300"
      >
        Contact Me
      </motion.a>
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 backdrop-blur-sm"
      >
        View Projects
      </motion.a>
    </motion.div>
  );
}

function HeroImage3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setRotation({
          x: (y - 0.5) * 20,
          y: (x - 0.5) * -20
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <FadeIn delay={0.4} direction="left">
      <motion.div
        ref={imageRef}
        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden transform-gpu"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 dark:from-primary/30 dark:to-purple-500/30 z-10 rounded-2xl" 
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        />
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.2s ease-out"
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743511798/ChatGPT_Image_Apr_1_2025_07_48_47_PM_fyq4uw.png"
            alt="Dzaky Athariq Ferreira"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* 3D floating elements */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 bg-blue-500 rounded-full opacity-70 z-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(40px) rotateX(${rotation.x * 1.5}deg) rotateY(${rotation.y * 1.5}deg)`,
          }}
        />
        <motion.div
          className="absolute bottom-12 left-8 w-20 h-20 bg-purple-500 rounded-lg opacity-70 z-20"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(60px) rotateX(${rotation.x * 1.8}deg) rotateY(${rotation.y * 1.8}deg)`,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-500 rounded-lg opacity-70 z-20"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            rotate: [0, 20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(80px) rotateX(${rotation.x * 2}deg) rotateY(${rotation.y * 2}deg)`,
          }}
        />
      </motion.div>
    </FadeIn>
  );
}