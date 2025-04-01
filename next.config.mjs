/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    // If needed for TypeScript support:
    typescript: {
      ignoreBuildErrors: false,
    },
  };
  
  export default nextConfig;