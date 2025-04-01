// src/app/certificates/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animation/FadeIn';
import { certificatesData } from '@/lib/data';
import { Certificate } from '@/types';

// Certificate Card Component
const CertificateCard = ({ certificate, index }: { certificate: Certificate; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn delay={0.2 + index * 0.1} direction={index % 2 === 0 ? "right" : "left"}>
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Certificate Image */}
        <div className="relative h-52 w-full">
          <Image
            src={certificate.image}
            alt={certificate.name}
            fill
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-primary/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <motion.a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Certificate
            </motion.a>
          </div>
        </div>
        
        {/* Certificate Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {certificate.name}
          </h3>
          <p className="text-primary dark:text-primary-light font-medium mb-1">
            {certificate.issuer}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Issued: {certificate.date}
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary dark:text-primary-light text-sm hover:underline"
            >
              View Certificate
            </a>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
              {new Date(certificate.date).getFullYear()}
            </span>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

// Certificate Viewer Modal
const CertificateViewer = ({ 
  certificate, 
  onClose 
}: { 
  certificate: Certificate | null;
  onClose: () => void;
}) => {
  if (!certificate) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96 w-full">
          <Image
            src={certificate.image}
            alt={certificate.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {certificate.name}
          </h3>
          <p className="text-primary dark:text-primary-light font-medium mb-2">
            {certificate.issuer}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Issued: {certificate.date}
          </p>
          
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              View Original
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Certificates Page Component
export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  // Group certificates by year
  const certificatesByYear: Record<string, Certificate[]> = {};
  certificatesData.forEach(certificate => {
    const year = new Date(certificate.date).getFullYear().toString();
    if (!certificatesByYear[year]) {
      certificatesByYear[year] = [];
    }
    certificatesByYear[year].push(certificate);
  });
  
  const years = Object.keys(certificatesByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Certificates & Credentials
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            Professional certifications and credentials that validate my skills and expertise in various technologies and domains.
          </p>
        </FadeIn>
        
        {/* Certificates Grid */}
        <div className="space-y-16">
          {years.map(year => (
            <div key={year}>
              <FadeIn>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                  {year}
                </h2>
              </FadeIn>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificatesByYear[year].map((certificate, index) => (
                  <div 
                    key={certificate.id} 
                    onClick={() => setSelectedCertificate(certificate)}
                    className="cursor-pointer"
                  >
                    <CertificateCard 
                      certificate={certificate} 
                      index={index} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <FadeIn delay={0.4}>
          <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-r from-primary/90 to-primary p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Looking for a skilled developer?
            </h2>
            <p className="text-white/90 mb-6">
              I'm constantly learning and improving my skills. Let's collaborate on your next project.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-flex items-center"
                >
                  Get In Touch
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition inline-flex items-center"
                >
                  View Projects
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeIn>
        
        {/* Certificate Viewer Modal */}
        {selectedCertificate && (
          <CertificateViewer 
            certificate={selectedCertificate} 
            onClose={() => setSelectedCertificate(null)} 
          />
        )}
      </div>
    </main>
  );
}