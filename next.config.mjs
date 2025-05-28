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
};

export default withMDX(config);
