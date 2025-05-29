import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: isDev,
  },
  // Static exports don't support rewrites
  // We'll handle this using static file generation instead
};

export default withMDX(config);
