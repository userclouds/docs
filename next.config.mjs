import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const isProd = process.env.NODE_ENV === "production";
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  assetPrefix: isProd ? (process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "./") : "",
  basePath: isProd
    ? (process.env.NEXT_PUBLIC_BASE_PATH ?? `${process.env.PWD}/out` ?? "")
    : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
