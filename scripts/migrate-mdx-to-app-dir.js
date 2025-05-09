#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const readdir = (dir) => fs.promises.readdir(dir);
const stat = (path) => fs.promises.stat(path);
const mkdir = (path, options) => fs.promises.mkdir(path, options);
const rename = (oldPath, newPath) => fs.promises.rename(oldPath, newPath);

// Function to recursively find all MDX files
async function findMdxFiles(dir) {
  const files = await readdir(dir);
  const mdxFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      // Skip node_modules and .next directories
      if (file === 'node_modules' || file === '.next') continue;

      // Recursively find MDX files in subdirectories
      const subDirMdxFiles = await findMdxFiles(filePath);
      mdxFiles.push(...subDirMdxFiles);
    } else if (file.endsWith('.mdx') && file !== 'page.mdx') {
      mdxFiles.push(filePath);
    }
  }

  return mdxFiles;
}

// Function to migrate MDX files to Next.js app directory structure
async function migrateMdxFiles(mdxFiles) {
  for (const mdxFile of mdxFiles) {
    const dirName = path.dirname(mdxFile);
    const fileName = path.basename(mdxFile, '.mdx');
    const newDirPath = path.join(dirName, fileName);
    const newFilePath = path.join(newDirPath, 'page.mdx');

    console.log(`Migrating ${mdxFile} to ${newFilePath}`);

    try {
      // Create new directory if it doesn't exist
      if (!fs.existsSync(newDirPath)) {
        await mkdir(newDirPath, { recursive: true });
      }

      // Move and rename the file
      await rename(mdxFile, newFilePath);
      console.log(`✅ Successfully migrated: ${mdxFile} -> ${newFilePath}`);
    } catch (error) {
      console.error(`❌ Error migrating ${mdxFile}:`, error);
    }
  }
}

// Main function
async function main() {
  try {
    const sourceDir = process.argv[2] || 'src/app/docs';

    if (!fs.existsSync(sourceDir)) {
      console.error(`Directory ${sourceDir} does not exist`);
      process.exit(1);
    }

    console.log(`Searching for MDX files in ${sourceDir}...`);
    const mdxFiles = await findMdxFiles(sourceDir);

    console.log(`Found ${mdxFiles.length} MDX files to migrate`);

    if (mdxFiles.length > 0) {
      await migrateMdxFiles(mdxFiles);
      console.log('Migration completed!');
    } else {
      console.log('No files to migrate.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
