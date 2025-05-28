# UserClouds Documentation

This repository contains the official documentation for UserClouds products and services.

## Quick Start

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building and Deployment

### Local Production Build

```bash
pnpm build
pnpm serve
```

### AWS Deployment

This project can be deployed to AWS using SST:

```bash
# Development deployment
pnpm sst:dev

# Production deployment
pnpm sst:deploy

# Remove deployment
pnpm sst:remove
```

For more detailed deployment information, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
docs/
├── app/              # Next.js application files
├── content/          # Documentation content (Markdown/MDX)
├── public/           # Static assets
├── lib/              # Utility libraries
├── scripts/          # Build scripts
└── .source/          # Generated source files
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production version
- `pnpm serve` - Serve production build locally
- `pnpm build:api` - Build OpenAPI documentation pages
- `pnpm types:check` - Check TypeScript types
- `pnpm clean` - Clean build artifacts

## License

Copyright © UserClouds, Inc. All rights reserved.
