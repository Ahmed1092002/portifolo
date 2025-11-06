import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.logs in production
  },

  images: {
    formats: ["image/avif", "image/webp"], // Modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  // Compression
  compress: true,

  // PowerPreference for better GPU utilization
  poweredByHeader: false, // Remove X-Powered-By header
};

export default nextConfig;
