import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // เพิ่มส่วนนี้เข้าไป
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // ตัวอย่างสำหรับรูปจาก Google
      },
    ],
  },
};

export default nextConfig;
