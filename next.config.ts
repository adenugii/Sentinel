// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Konfigurasi Gambar (agar tidak error image src)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'share.google',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // 2. Konfigurasi Proxy (PENTING UNTUK API)
  async rewrites() {
    return [
      {
        // Artinya: Semua request ke localhost:3000/api/proxy/...
        source: '/api/proxy/:path*',
        // Akan diteruskan ke: backend/...
        destination: 'https://sentinel-api-ochre.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;