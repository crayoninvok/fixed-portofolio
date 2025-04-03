// src/components/about/skillsData.ts
import { Skill } from "./SkillsMarquee";

// List of primary skills as strings (for backward compatibility if needed)
export const primarySkills: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Tailwind CSS",
  "RESTful APIs",
  "MongoDB",
  "Git",
  "Responsive Design",
  "Marine Electronics",
];

// Enhanced skills with logos for the marquee
export const skillsWithLogos: Skill[] = [
  {
    id: "nextjs",
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    id: "react",
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    id: "typescript",
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Language",
  },
  {
    id: "nodejs",
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    id: "express",
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "Backend",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Database",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    category: "Frontend",
  },
  {
    id: "restapi",
    name: "RESTful APIs",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
    category: "Backend",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database",
  },
  {
    id: "git",
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "DevOps",
  },
  {
    id: "responsive",
    name: "Responsive Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Frontend",
  },
  {
    id: "marine",
    name: "Marine Electronics",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    category: "Other",
  },
];
