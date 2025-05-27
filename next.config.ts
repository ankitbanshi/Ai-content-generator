import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "img.icons8.com", // Add this line
    ],
  },
};

export default nextConfig;
