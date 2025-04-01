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
          ? "bg-white dark:bg-gray-900 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="https://res.cloudinary.com/dpuqloe2r/image/upload/v1743512023/ChatGPT_Image_Apr_1_2025_07_51_15_PM_oqe5wv.png" // Update with your actual logo path
                  alt="Portfolio Logo"
                  fill
                  className="object-contain rounded-full" // Add rounded-full here
                />
              </div>
              <span className="text-2xl font-bold text-primary dark:text-white">
                Portfolio
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.path}>
                  <span
                    className={`relative text-base font-medium transition-colors hover:text-primary ${
                      pathname === item.path
                        ? "text-primary dark:text-primary-light"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary dark:bg-primary-light"
                        layoutId="navbar-underline"
                      />
                    )}
                  </span>
                </Link>
              </motion.div>
            ))}
            <ThemeSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-4 text-gray-700 dark:text-gray-300"
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
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span
                    className={`block px-2 py-1 ${
                      pathname === item.path
                        ? "text-primary dark:text-primary-light font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
