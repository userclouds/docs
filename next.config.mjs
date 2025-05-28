import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  // Enable static exports for everything except the API route
  distDir: ".next",
  // Specify that the /api/search path needs server-side rendering
  // This will be handled by the Lambda function in SST
  experimental: {
    // This tells Next.js that API routes are handled externally
    externalDir: true,
  },
  images: {
    unoptimized: isDev,
    remotePatterns: [
      {
        hostname: "files.readme.io",
      },
    ],
  },
  // Add rewrites for the API endpoint
  async rewrites() {
    return [
      {
        source: "/api/search",
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/search`
          : "/api/search",
      },
    ];
  },
  // Ensure trailing slashes for better compatibility with S3/CloudFront
  trailingSlash: true,
};

export default withMDX(config);
