// src/components/education/EducationCard.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Education } from "@/types";
import PhotoAlbum from "@/components/common/PhotoAlbum";

type EducationCardProps = {
  education: Education;
};

// Sample photos for each education - in production, you'd add these to your Education type and data
const getEducationPhotos = (schoolName: string) => {
  const photoSets = {
    "7 Senior High School Bandung": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714878/ppdb-sman-7-kota-bandung-tahun-2018-3_xi1fyd.jpg",
        alt: "School building",
        caption: "Main building of 7 Senior High School Bandung",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714877/WhatsApp-Image-2021-09-04-at-13.05.49_dns2w5.jpg",
        alt: "School Building Front",
        caption: "Front Views",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714880/IMG_1321_fpesm2.jpg",
        alt: "Study Tour",
        caption: "Student council meeting",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714879/DSC_0032_uiai6u.jpg",
        alt: "Graduation",
        caption: "Participating in regional science competition",
      },
    ],
    "Sepuluh Nopember Institute of Technology": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713898/1556707168488_mqihwf.jpg",
        alt: "Campus view",
        caption: "Main campus of Sepuluh Nopember Institute of Technology",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713568/5df9538f-c06f-43e9-b3ef-7661893bd0f2_xi3rpa.jpg",
        alt: "Engineering lab",
        caption: "Instrumentation engineering laboratory",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713657/WhatsApp_Image_2025-04-04_at_03.46.51_b93qgq.jpg",
        alt: "Thesis project",
        caption: "Working on sensor network thesis project",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713569/9cde8177-17be-4377-bfa3-b2be11b2e772_lx2kmk.jpg",
        alt: "Engineering competition",
        caption: "Participating in national instrumentation competition",
      },
    ],
    "Purwadhika Digital Technology School": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713787/WhatsApp_Image_2025-04-04_at_03.49.21_f4wtag.jpg",
        alt: "Coding session",
        caption: "Intensive coding session",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743712222/ab8eb7eb-d37d-45d3-81d3-814578faf7e4_gpnmcn.jpg",
        alt: "Squad",
        caption: "Collaborating on a full-stack project",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713766/WhatsApp_Image_2025-04-04_at_03.49.49_yiliod.jpg",
        alt: "Presentation",
        caption: "Presenting a project to peers",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743713765/WhatsApp_Image_2025-04-04_at_03.51.37_nixx8t.jpg",
        alt: "Graduate ceremony",
        caption: "Receiving completion certificate",
      },
    ],
  };

  return photoSets[schoolName as keyof typeof photoSets] || [];
};

export default function EducationCard({ education }: EducationCardProps) {
  const educationPhotos = getEducationPhotos(education.school);

  return (
    <div className="grid md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-3 space-y-4">
        <div className="flex items-center">
          <div className="relative w-14 h-14 mr-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center justify-center">
            <Image
              src={education.logo}
              alt={education.school}
              width={100}
              height={100}
              className="object-contain max-h-10"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate max-w-[180px]">
              {education.school.split(" ").slice(0, 2).join(" ")}...
            </h3>
            <p className="text-primary dark:text-primary-light font-medium text-sm">
              {education.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-9 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {education.school}
        </h3>
        <h4 className="text-lg text-primary dark:text-primary-light font-medium mb-4">
          {education.degree}
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {education.description}
        </p>

        {/* Photo Album Section */}
        {educationPhotos.length > 0 && (
          <PhotoAlbum photos={educationPhotos} title="Campus Life" />
        )}

        <div className="pt-2">
          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Key Courses & Focus Areas
          </h5>
          <div className="flex flex-wrap gap-2">
            {education.courses.map((course, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
