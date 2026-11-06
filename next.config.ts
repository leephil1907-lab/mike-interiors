import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [96, 128, 168, 256, 384],
    remotePatterns: [
      {
        // Images uploaded through the admin studio live in Supabase Storage.
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },
  poweredByHeader: false,
  compress: true
};

export default nextConfig;
