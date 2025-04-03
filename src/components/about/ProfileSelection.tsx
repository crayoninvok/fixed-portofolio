// src/components/about/ProfileSection.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/animation/FadeIn";
import { userInfo } from "@/lib/data";
import SocialIcon from "@/components/about/SocialIcon";

export default function ProfileSection() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
      <FadeIn delay={0.2}>
        <motion.div
          className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743710304/b922269c-26b9-4551-b336-e40f45c8a57c_xzsxtw.jpg"
            alt="Dzaky Athariq Ferreira"
            fill
            className="object-cover"
          />
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.3} direction="left">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dzaky Athariq Ferreira
          </h2>
          <h3 className="text-xl text-primary dark:text-primary-light font-medium">
            Full Stack Web Developer
          </h3>

          <p className="text-gray-700 dark:text-gray-300">
            I am a passionate full stack web developer who transitioned from a
            career in marine electrical systems, bringing a unique technical
            perspective to web development. I specialize in building modern web
            applications using Next.js, React, and TypeScript.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            I enjoy creating responsive, accessible, and performant web
            experiences that solve real-world problems. With a strong foundation
            in both frontend and backend technologies, combined with my
            background in maritime systems, I strive to deliver high-quality
            code and exceptional user experiences that blend technical precision
            with creative solutions.
          </p>

          <div className="pt-2">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Connect with me
            </h4>
            <div className="flex space-x-4">
              {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
