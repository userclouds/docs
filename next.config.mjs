import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "./";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

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
