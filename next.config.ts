import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment - uncomment and set your repo name if not using custom domain
  // basePath: "/me-site",
};

export default nextConfig;
