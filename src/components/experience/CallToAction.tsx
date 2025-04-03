import { motion } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animation/FadeIn";

export default function CallToAction() {
  return (
    <FadeIn delay={0.8}>
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/90 to-primary p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Interested in working together?
        </h2>
        <p className="text-white/90 mb-6">
          I'm always open to discussing new projects, opportunities, and
          collaborations.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-flex items-center"
            >
              Get In Touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
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
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition inline-flex items-center"
            >
              View My Projects
            </motion.button>
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
