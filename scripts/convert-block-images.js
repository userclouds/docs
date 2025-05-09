#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert [block:image] to HTML/MDX format
function convertBlockImages(content) {
  // Regex to match [block:image] blocks
  const blockImageRegex = /\[block:image\]\s*(\{[\s\S]*?\})\s*\[\/block\]/g;

  return content.replace(blockImageRegex, (match, jsonContent) => {
    try {
      // Parse the JSON content
      const blockData = JSON.parse(jsonContent);

      if (!blockData.images || !blockData.images.length) {
        return match; // Return original if no images
      }

      const image = blockData.images[0];
      const imageUrl = image.image[0];
      const alt = image.image[2] || '';
      const caption = image.caption || '';
      const hasBorder = image.border === true;

      // Create HTML with center alignment
      return `<div align="center">
  <img src="${imageUrl}" alt="${alt.replace(/"/g, '&quot;')}"${hasBorder ? ' border="1"' : ''} />
  <p><em>${caption}</em></p>
</div>`;
    } catch (error) {
      console.error('Error processing JSON:', error);
      return match; // Return original on error
    }
  });
}

// Find all MDX files in the content directory
const contentDir = path.join(path.resolve(), 'src', 'content', 'docs');
const mdxFiles = await glob(`${contentDir}/**/*.mdx`);

let convertedCount = 0;
let errorCount = 0;

// Process each file
for (const filePath of mdxFiles) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if the file contains [block:image]
    if (content.includes('[block:image]')) {
      const convertedContent = convertBlockImages(content);

      // Only write if changes were made
      if (convertedContent !== content) {
        fs.writeFileSync(filePath, convertedContent, 'utf8');
        console.log(`Converted: ${path.relative(path.resolve(), filePath)}`);
        convertedCount++;
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    errorCount++;
  }
}

console.log(`\nConversion complete!`);
console.log(`Files converted: ${convertedCount}`);
console.log(`Errors encountered: ${errorCount}`);
