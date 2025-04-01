// Sample data for the portfolio
// lib/data.ts

import { Project, Experience, Certificate } from "@/types";

// projectsData with images array instead of single image field

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Company Profile Web",
    name: "Nautika Sentra Indonesia",
    description:
      "A modern, responsive company profile website for Nautika Sentra Indonesia, showcasing their maritime services, company history, and team members. Features dynamic content management through Contentful CMS, allowing easy updates without code changes.",
    images: [
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743514395/NSIFRONT_pabrls.jpg",
      // Add additional images here when available
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Contentful CMS",
      "Random User",
      "Vercel",
    ],
    link: "https://nsi-profile.vercel.app/",
    github: "https://github.com/crayoninvok/NSIProfile",
  },
  {
    id: "2",
    title: "Event Ticket Management Web App",
    name: "TIKO",
    description:
      "A comprehensive event ticketing platform that enables users to browse, purchase, and manage tickets for various events. Features include user authentication, real-time seat selection, secure payment processing via Midtrans, QR code ticket generation, and admin dashboard for event management.",
    images: [
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743514396/TIKOFRONT_ryehkb.png",
      // Add additional images here when available
    ],
    technologies: [
      "Next.js",
      "Typescript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Express.js",
      "Prisma ORM",
      "Postman",
      "Midtrans",
      "Vercel",
    ],
    link: "https://tiko-miniproject.vercel.app/",
    github: {
      frontend:
        "https://github.com/crayoninvok/Git-Collab/tree/main/frontendnextjs",
      backend: "https://github.com/tsaniafarihaa/Backend-Minpro",
    },
  },
  {
    id: "3",
    title: "Online Gadgets Store App",
    name: "Tech Lite",
    description:
      "A feature-rich e-commerce platform specialized in electronics and gadgets. Includes product catalog with advanced filtering, user reviews, shopping cart functionality, wishlists, and secure checkout with multiple payment options. Integrated with AIS API for product verification and Midtrans for payment processing.",
    images: [
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743521410/Screenshot_2025-04-01_222948_mstfsq.png",
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743514402/TECHPRO_ntvzit.png",
    ],
    technologies: [
      "Next.js",
      "Typescript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Express.js",
      "Prisma ORM",
      "Postman",
      "Midtrans",
      "AIS API",
      "Vercel",
    ],
    link: "https://techlive-three.vercel.app/",
    github: {
      frontend:
        "https://github.com/mirzaali45/Finpro_Online-Grocery-Web-App_Frontend",
      backend:
        "https://github.com/mirzaali45/Finpro_Online-Grocery-Web-App_Backend",
    },
  },
  {
    id: "4",
    title: "Vessel Maintenance Management Web App",
    name: "VessM",
    description:
      "An advanced maritime vessel maintenance management system designed for shipping companies and vessel operators. Tracks maintenance schedules, spare parts inventory, crew certifications, and provides detailed analytics on vessel performance. Features interactive maintenance logs, real-time alerts for upcoming maintenance, integration with Google Maps for vessel tracking, and comprehensive reporting tools.",
    images: [
      "https://res.cloudinary.com/dcf4czeat/image/upload/v1742851554/super_admin_n8pzkq.png",
      "https://res.cloudinary.com/dcf4czeat/image/upload/v1742851554/super_admin_n8pzkq.png", // Using the preview image as second image
      // Add additional images here when available
    ],
    technologies: [
      "Next.js",
      "Typescript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Express.js",
      "Prisma ORM",
      "Postman",
      "Google API",
      "Midtrans",
      "Vercel",
    ],
    link: "On Progress",
    github: {
      frontend: "https://github.com/crayoninvok/VesselService-Monitoring-FE",
      backend: "https://github.com/crayoninvok/VesselService-Monitoring-BE",
    },
    // Remove preview field since we're now using images array
  },
];

export const experienceData: Experience[] = [
  {
    id: "1",
    company: "Indonesia Aerospace (IAe)",
    position: "Internship Engineering Avionics, Electrics & Instrumentation",
    duration: "Jan 2022 - Present",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743513737/Indonesian_Aerospace_logo_oabwbx.png", // Add the path to your company logo
    description: [
      "Assisted in the design and testing of avionics systems for commercial aircraft",
      "Performed diagnostic and troubleshooting procedures on aircraft electrical systems",
      "Collaborated with senior engineers to implement and verify instrumentation calibration protocols",
      "Documented technical specifications and test results for regulatory compliance",
      "Participated in cross-functional team meetings to coordinate integration of avionic subsystems",
    ],
    technologies: [
      "Avionics Systems",
      "Electrical Diagnostics",
      "Instrumentation Testing",
      "Technical Documentation",
      "Aerospace Standards",
    ],
  },
  {
    id: "2",
    company: "PT.Sulendraputra Sukses Inspection",
    position: "Marine Radio Inspector",
    duration: "Feb 2022 - Sep 2024",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743513731/PT.SULENDRAPUTRA_SUKSES_cxxens.jpg", // Add the path to your company logo
    description: [
      "Conducted comprehensive inspections of marine radio communication systems for commercial vessels",
      "Performed regulatory compliance checks according to international maritime standards",
      "Diagnosed and resolved technical issues in shipboard radio equipment and navigation systems",
      "Created detailed inspection reports and maintenance recommendations for vessel operators",
      "Coordinated with port authorities and maritime agencies for certification requirements",
    ],
    technologies: [
      "GMDSS",
      "VHF/MF/HF Radio Systems",
      "SART",
      "EPIRB",
      "AIS",
      "Radar Systems",
      "Maritime Regulations",
    ],
  },
  {
    id: "3",
    company: "PT. Sulendraputra Sukses VDR",
    position: "VDR Engineer",
    duration: "Sep 2024 - Sep 2024",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743513731/PT.SULENDRAPUTRA_SUKSES_cxxens.jpg", // Same company, same logo
    description: [
      "Specialized in installation, maintenance, and annual performance testing of Voyage Data Recorders (VDR) on commercial vessels",
      "Conducted data recovery and analysis from VDR systems following maritime incidents",
      "Implemented firmware updates and system configurations to ensure operational reliability",
      "Collaborated with vessel technical teams to resolve integration issues with bridge systems",
      "Provided technical training to ship crews on proper VDR operation and maintenance procedures",
    ],
    technologies: [
      "Voyage Data Recorders (VDR)",
      "S-VDR",
      "Bridge Integration Systems",
      "Data Recovery",
      "IMO Regulations",
      "SOLAS Requirements",
    ],
  },
];

export const certificatesData: Certificate[] = [
  {
    id: "1",
    name: "Process Measurement Instrumentation",
    issuer: "Yokogawa Indonesia",
    date: "August 2021",
    image:
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743516442/3a7668c43cc459942a917cc1490266f57e145f59_kft0jo.jpg",
    link: "https://drive.google.com/file/d/1goYnd9VG_isVj1ImEfYbWLqOqckPpReA/view?usp=sharing",
  },
  {
    id: "2",
    name: "General Operator Certificate GMDSS",
    issuer: "Direktorat Jendral Sumber Daya dan Perangkat Pos dan Informatika",
    date: "November 2021",
    image:
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743517886/channels4_profile_rg2mpg.jpg",
    link: "https://drive.google.com/file/d/1uBiW2ec8tp2H93un7ZoxmGOSR5xcTrtI/view?usp=drive_link",
  },
  {
    id: "3",
    name: "Annual Performance & Reprogramming Voyage Data Recorder",
    issuer: "Furuno Singapore",
    date: "September 2023",
    image:
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743518037/20170801_100414-e1501835029873_fm7yq1.jpg",
    link: "https://drive.google.com/file/d/1vsAx26VKQXuq0-j90mHrwxBgwqGmhSmn/view?usp=drive_link",
  },
  {
    id: "4",
    name: "Full Stack Web Developper",
    issuer: "Purwadhika Technology School",
    date: "March 2025",
    image:
      "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743518376/Purwadhika.original_swj0li.jpg",
    link: "https://drive.google.com/file/d/1kkKEya1cFTmv2px5-gua4RjRMhgFtjNX/view?usp=sharing",
  },
];

// User information for the About section
export const userInfo = {
  name: "Dzaky Athariq Ferreira",
  title: "Full Stack Developer",
  email: "dathariqf@gmail.com",
  location: "Bandung, West Java, Indonesia",
  about:
    "I am a passionate full stack developer who transitioned from a career in marine electrical systems, bringing a unique technical perspective to web development. I specialize in building modern web applications using Next.js, React, and TypeScript. I enjoy creating responsive, accessible, and performant web experiences that solve real-world problems. With a strong foundation in both frontend and backend technologies, combined with my background in maritime systems, I strive to deliver high-quality code and exceptional user experiences that blend technical precision with creative solutions.",
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Next.js", "REST APIs"],
    },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
    {
      category: "DevOps",
      items: ["Git", "GitHub Actions", "Docker", "Vercel"],
    },
    {
      category: "Other",
      items: [
        "Agile Methodologies",
        "UI/UX Design",
        "Responsive Web Design",
        "Web Accessibility",
      ],
    },
  ],
  socialLinks: {
    github: "https://github.com/crayoninvok",
    linkedin:
      "https://www.linkedin.com/in/dzaky-athariq-ferreira-s-tr-t-a820b3180/",
    twitter: "https://x.com/ZAthariqFr",
    instagram: "https://www.instagram.com/dzakyathariq/",
  },
};

export const educationData = [
  {
    school: "7 Senior High School Bandung",
    degree: "Science Major",
    duration: "2014 - 2017",
    description:
      "Focused on physics, mathematics, and chemistry with excellent academic standing. Participated in various science competitions and served as a member of the student council. Developed strong analytical and problem-solving skills that became foundational for my engineering studies.",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743511066/logo-sma-negeri-7-bandung-01_tlkrrl.webp",
    courses: [
      "Physics",
      "Advanced Mathematics",
      "Chemistry",
      "Biology",
      "Computer Science",
    ],
  },
  {
    school: "Sepuluh Nopember Institute of Technology",
    degree: "Bachelor of Engineering in Instrumentation Engineering",
    duration: "2017 - 2021",
    description:
      "Specialized in control systems, sensor technologies, and industrial automation. Completed thesis on 'Intelligent Sensor Networks for Industrial Monitoring Systems' with distinction. Actively involved in engineering society and participated in national instrumentation competitions.",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743511163/logo-its-biru-transparan_gj6lxz.png",
    courses: [
      "Control Systems",
      "Sensor Technology",
      "Signal Processing",
      "Industrial Automation",
      "Embedded Systems",
      "PLC Programming",
    ],
  },
  {
    school: "Purwadhika Digital Technology School",
    degree: "Full Stack Web Development Bootcamp",
    duration: "2024 - 2025",
    description:
      "Intensive program focused on modern web development technologies and industry best practices. Built several full-stack applications including an e-commerce platform, social media app, and data visualization dashboard. Gained hands-on experience with modern development workflows and collaborative coding using Git.",
    logo: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743526460/portfolios-purwadhika_hayhqs.png",
    courses: [
      "JavaScript/TypeScript",
      "React & Next.js",
      "Node.js & Express",
      "MongoDB & SQL",
      "RESTful API Design",
      "UI/UX Fundamentals",
      "DevOps Basics",
    ],
  },
];
