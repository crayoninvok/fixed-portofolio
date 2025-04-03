// src/components/common/PhotoAlbum.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Photo } from "@/types";

interface PhotoAlbumProps {
  photos: Photo[];
  title: string;
}

export default function PhotoAlbum({ photos, title }: PhotoAlbumProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="mt-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h3>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-gray-100 dark:bg-gray-800"
            whileHover={{ y: -5 }}
            onClick={() => openModal(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls */}
              <div className="absolute top-0 right-0 z-10 flex gap-2 p-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Previous Button */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image Display */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[80vh] bg-gray-800 rounded-lg overflow-hidden"
              >
                <Image
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </motion.div>

              {/* Caption */}
              {photos[currentIndex].caption && (
                <div className="bg-gray-800/70 text-white p-4 text-center rounded-b-lg">
                  <p>{photos[currentIndex].caption}</p>
                </div>
              )}

              {/* Thumbnail Navigation */}
              <div className="mt-4 flex justify-center space-x-2 overflow-x-auto py-2">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className={`relative w-16 h-16 rounded-md overflow-hidden cursor-pointer ${
                      index === currentIndex
                        ? "ring-2 ring-primary"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
