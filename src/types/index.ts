// src/types/index.ts
export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  name: string;
  description: string;
  images: string[];
  image?: string; // Optional now, can be removed in the future
  technologies: string[];
  link: string;
  github: string | { frontend: string; backend: string };
  preview?: string; // Optional, can be removed in the future
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  // You can add this field later when you have real photos
  // photos?: Photo[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  description: string;
  logo: string;
  courses: string[];
  // You can add this field later when you have real photos
  // photos?: Photo[];
}
