// types/index.ts - Type definitions
export interface Project {
    id: string;
    title: string;
    name: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    github: string | { frontend: string; backend: string };
    preview?:string
  }
  
  export interface Experience {
    id: string;
    company: string;
    logo: string;
    position: string;
    duration: string;
    description: string[];
    technologies: string[];
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
  }