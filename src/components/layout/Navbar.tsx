"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Maritime-themed top border when scrolled */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500"></div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-12 w-12 mr-3 overflow-hidden rounded-full border-2 border-blue-500/50 dark:border-cyan-400/50 shadow-md">
                <Image
                  src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743512023/ChatGPT_Image_Apr_1_2025_07_51_15_PM_oqe5wv.png"
                  alt="Portfolio Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
                {/* Animated wave overlay */}
                <div className="absolute bottom-0 left-0 w-full h-3 bg-blue-500/20 dark:bg-blue-400/30">
                  <div className="absolute w-full h-full">
                    <svg
                      className="absolute bottom-0 w-full"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        className="animate-wave fill-blue-400/40 dark:fill-cyan-500/40"
                        d="M0,0 C30,5 70,5 100,0 L100,10 L0,10 Z"
                      />
                      <path
                        className="animate-wave-slow fill-blue-500/30 dark:fill-blue-500/30"
                        d="M0,3 C20,8 80,8 100,3 L100,10 L0,10 Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                  PortsideFolio
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-mono tracking-wider">
                  DZAKY ATHARIQ FERREIRA
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.path}>
                  <span
                    className={`relative px-4 py-2 text-base font-medium transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                      pathname === item.path
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    } group overflow-hidden`}
                  >
                    {/* Navigation radar ping effect on active item */}
                    {pathname === item.path && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="absolute w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                        <span className="absolute w-6 h-6 bg-blue-500/10 dark:bg-blue-400/20 rounded-full animate-ping"></span>
                      </span>
                    )}

                    {item.name}

                    {pathname === item.path && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300"
                        layoutId="navbar-underline"
                      />
                    )}

                    {/* Subtle wave indicator on hover */}
                    <span className="absolute bottom-0 left-0 w-full h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg
                        className="absolute bottom-0 w-full"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <path
                          className="animate-wave-slow fill-blue-400/20 dark:fill-blue-500/20"
                          d="M0,10 C30,15 70,15 100,10 L100,20 L0,20 Z"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <ThemeSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-4 text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-1 py-2 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.span
                    whileHover={{ x: 4 }}
                    className={`block px-4 py-3 border-l-2 ${
                      pathname === item.path
                        ? "text-blue-600 dark:text-blue-400 font-semibold border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 border-transparent"
                    }`}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
