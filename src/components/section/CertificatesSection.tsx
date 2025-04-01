// components/section/CertificatesSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import AnimatedText from '@/components/animation/AnimatedText';
import { certificatesData } from '@/lib/data';

export default function CertificatesSection() {
  const [visibleCertificates, setVisibleCertificates] = useState(4);
  
  const loadMore = () => {
    setVisibleCertificates(prev => 
      prev + 4 <= certificatesData.length ? prev + 4 : certificatesData.length
    );
  };

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            <AnimatedText text="Certificates & Achievements" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Professional certifications and achievements that validate my expertise and continuous learning in various technologies and methodologies.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.slice(0, visibleCertificates).map((certificate, index) => (
            <FadeIn key={certificate.id} delay={0.1 * (index % 4)}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={certificate.image}
                    alt={certificate.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg line-clamp-1">{certificate.name}</h3>
                      <p className="text-gray-300 text-sm">{certificate.issuer} • {certificate.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-end">
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary dark:text-primary-light hover:underline text-sm font-medium"
                  >
                    View Certificate
                  </a>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {visibleCertificates < certificatesData.length && (
          <div className="text-center mt-10">
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}