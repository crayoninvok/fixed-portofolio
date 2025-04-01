'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animation/FadeIn';
import { userInfo } from '@/lib/data';

// Email sending function
const sendEmail = async (formData: FormData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }
    
    return { success: true, ...result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export default function ContactPage() {
  // Form state management
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Status tracking for form submission
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        type: 'error',
        message: 'Please fill out all required fields',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }
    
    // Set loading state
    setStatus({
      type: 'loading',
      message: 'Sending your message...',
    });
    
    // Create FormData object
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    try {
      // Send email
      const result = await sendEmail(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully! I will get back to you soon.',
        });
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error 
          ? error.message 
          : 'Failed to send your message. Please try again later.',
      });
    }
  };
  
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Fill out the form below or reach out through my social profiles.
          </p>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Information */}
          <FadeIn delay={0.2} direction="right">
            <div className="space-y-8">
              {/* Contact Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  {/* Email Contact */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                      <a 
                        href={`mailto:${userInfo.email}`} 
                        className="text-primary dark:text-primary-light hover:underline"
                      >
                        {userInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* Location Contact */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {userInfo.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Connect With Me
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="mr-3">
                        {platform === 'github' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        )}
                        {platform === 'linkedin' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        )}
                        {platform === 'twitter' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        )}
                        {platform === 'instagram' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        )}
                      </div>
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
          
          {/* Contact Form */}
          <FadeIn delay={0.3} direction="left">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Hello, I'd like to discuss a project..."
                    required
                  ></textarea>
                </div>
                
                {/* Status Message */}
                {status.message && (
                  <div 
                    className={`p-4 rounded-lg ${
                      status.type === 'error' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                        : status.type === 'success'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                
                <div>
                  <motion.button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors flex justify-center items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status.type === 'loading'}
                  >
                    {status.type === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}