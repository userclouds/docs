import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    unoptimized: isDev,
    remotePatterns: [
      {
        hostname: 'files.readme.io',
      },
    ],
  },
};

export default withMDX(config);
