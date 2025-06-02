import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const isProduction = process.env.NODE_ENV === "production";

let assetPrefix = isProduction ? "./" : "";
let basePath = "";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  assetPrefix,
  basePath,
  env: {
    assetPrefix,
    basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
