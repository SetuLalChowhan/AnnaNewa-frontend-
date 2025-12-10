import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // Exact hostname from your URL
        port: '',  // Allows any port (or leave empty for default)
        pathname: '/**',  // Matches any path, including /ddged1k3w/image/upload/...
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;