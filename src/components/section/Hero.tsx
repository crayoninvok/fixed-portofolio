'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedText from '../animation/AnimatedText';
import FadeIn from '../animation/FadeIn';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <FadeIn delay={0.2}>
      <div className="space-y-6">
        <div className="text-sm font-medium text-primary dark:text-primary-light">
          Welcome to my portfolio
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          Hi, I'm Dzaky Athariq Ferreira
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-medium">
          A Full Stack Developer specialized in Next.js & TypeScript
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          I create beautiful, interactive, and responsive web applications with
          modern technologies. Let's build something amazing together.
        </p>
        <HeroButtons />
      </div>
    </FadeIn>
  );
}

function HeroButtons() {
  return (
    <div className="flex space-x-4">
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
      >
        Contact Me
      </motion.a>
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        View Projects
      </motion.a>
    </div>
  );
}

function HeroImage() {
  return (
    <FadeIn delay={0.4} direction="left">
      <motion.div
        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 dark:from-primary/30 dark:to-purple-500/30 z-10 rounded-2xl" />
        <Image
          src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743511798/ChatGPT_Image_Apr_1_2025_07_48_47_PM_fyq4uw.png"
          alt="Dzaky Athariq Ferreira"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </FadeIn>
  );
}