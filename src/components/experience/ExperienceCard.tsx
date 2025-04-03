// src/components/experience/ExperienceCard.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Experience } from "@/types";
import PhotoAlbum from "@/components/common/PhotoAlbum";

type ExperienceCardProps = {
  experience: Experience;
};

// Sample photos for each experience - in production, you'd add these to your Experience type and data
const getExperiencePhotos = (experienceId: string) => {
  const photoSets = {
    "1": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714578/IMG20190722124033_vsyhzu.jpg",
        alt: "Aircraft avionics system testing",
        caption: "Working on avionics system testing",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714550/IMG_20190704_133419_tsouqh.jpg",
        alt: "Instrumentation calibration",
        caption: "Calibrating aircraft instruments",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714586/IMG20190722121217_blr6lp.jpg",
        alt: "Engineering team meeting",
        caption: "Team meeting for system integration planning",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714550/IMG_20190704_133427_fnraqx.jpg",
        alt: "Avionics software debugging",
        caption: "Debugging avionics software",
      },
    ],
    "2": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743712430/e92ddde3-1e8b-4f94-901c-74e5f9c1694c_qepnaq.jpg",
        alt: "Marine radio inspection",
        caption:
          "Inspecting a vessels GMDSS equipment, Tangguh Mangiwang at Sorong ",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714012/WhatsApp_Image_2025-04-04_at_03.42.33_1_igkngf.jpg",
        alt: "Radio testing equipment",
        caption: "Testing marine communication systems",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714013/WhatsApp_Image_2025-04-04_at_03.43.21_k6jewl.jpg",
        alt: "Vessel bridge inspection",
        caption: "Conducting inspection on vessel bridge",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714013/WhatsApp_Image_2025-04-04_at_03.39.20_wmkbhv.jpg",
        alt: "Filing inspection report",
        caption: "Completing inspection documentation",
      },
    ],
    "3": [
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714131/WhatsApp_Image_2025-04-04_at_03.45.13_l5q0dv.jpg",
        alt: "VDR installation",
        caption: "Installing new Voyage Data Recorder",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714132/WhatsApp_Image_2025-04-04_at_03.40.43_coe821.jpg",
        alt: "VDR testing",
        caption: "Performing annual performance test",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714131/WhatsApp_Image_2025-04-04_at_03.41.13_jzjzuj.jpg",
        alt: "Data recovery",
        caption: "VDR data analysis and recovery process",
      },
      {
        src: "https://res.cloudinary.com/dpuqloe2r/image/upload/v1743714132/WhatsApp_Image_2025-04-04_at_03.41.38_pqwuvt.jpg",
        alt: "Crew training",
        caption: "Training ship crew on VDR operation",
      },
    ],
  };

  return photoSets[experienceId as keyof typeof photoSets] || [];
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const experiencePhotos = getExperiencePhotos(experience.id);

  return (
    <div className="grid md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-3 space-y-4">
        <div className="flex items-center">
          <div className="relative w-14 h-14 mr-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex items-center justify-center">
            <Image
              src={experience.logo}
              alt={experience.company}
              width={100}
              height={100}
              className="object-contain max-h-10"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {experience.position.split(" ").slice(0, 1).join(" ")}
            </h3>
            <p className="text-primary dark:text-primary-light font-medium text-sm">
              {experience.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-9 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {experience.position}
        </h3>
        <h4 className="text-lg text-primary dark:text-primary-light font-medium mb-4">
          {experience.company}
        </h4>
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {experience.description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {/* Photo Album Section */}
          {experiencePhotos.length > 0 && (
            <PhotoAlbum photos={experiencePhotos} title="Photo Gallery" />
          )}

          <div className="pt-4">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Technologies & Skills
            </h5>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
