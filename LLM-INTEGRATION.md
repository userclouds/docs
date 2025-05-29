# LLM Integration for Fumadocs (Static Export)

This document explains the LLM (Large Language Model) integration features that have been added to the Fumadocs site with support for static exports.

## Overview

The LLM integration provides machine-readable versions of your documentation to make it more accessible to AI systems. This integration offers:

1. A static file (`/llms.txt`) containing all docs in plain text format
2. A comprehensive static file (`/llm-full.txt`) with additional metadata
3. Static `.mdx` files for each documentation page, generated during build time

## Features

### 1. Basic Text Format (`/llms.txt`)

Access all documentation in a simplified text format by visiting `/llms.txt`. This endpoint combines all documentation pages into a single text file with basic formatting:

```
# Page Title
URL: /docs/path/to/page

Page description

Content of the page...
```

### 2. Full Text Format with Metadata (`/llm-full.txt`)

Access a more comprehensive version with additional metadata by visiting `/llm-full.txt`:

```
# Page Title
URL: /docs/path/to/page
Created: 2023-01-01T00:00:00.000Z
Last Modified: 2023-01-15T00:00:00.000Z

Page description

Content of the page...

Tags: tag1, tag2, tag3
```

### 3. Individual Page Content (`*.mdx`)

Access the content of individual pages by appending `.mdx` to any documentation URL. These are static files generated during the build process:

```
https://your-site.com/docs/path/to/page.mdx
```

Note: Unlike dynamic routes, these are actual files created during the build process and placed in the appropriate directories.

## Implementation Details

This integration uses:

- Remark plugins for processing MDX content
- Next.js static page generation for the main files
- A custom build script to generate individual `.mdx` files for each page
- Static file deployment compatible with any hosting provider

## Use Cases

- **AI Training**: Provide these endpoints to AI systems for training or fine-tuning
- **Embedding Generation**: Generate vector embeddings from your docs for semantic search
- **Content Extraction**: Easily extract content for integration with other systems
- **Chatbots**: Feed this content to chatbots to answer questions based on your documentation

## Configuration

The integration is pre-configured and will automatically generate all necessary files during the build process. The `npm run build` command has been updated to include the generation of `.mdx` files for each documentation page.

If you need to customize the output format or add more metadata, you can modify:

- `getLLMText` and `getLLMFullText` functions in `lib/get-llm-text.ts` for content formatting
- `scripts/generate-mdx-files.ts` for customizing how individual `.mdx` files are generated

### Build Process

The integration follows these steps during build:

1. Next.js builds the main site including the `/llms.txt` and `/llm-full.txt` pages
2. A post-build script (`generate:mdx`) runs to create individual `.mdx` files for each doc page
3. All files are placed in the `out` directory ready for deployment