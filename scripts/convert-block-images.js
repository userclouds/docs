#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

// Get the current file's directory using ES modules pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert [block:image] to Markdown format
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
            const alt = image.image[2] || "";
            const caption = image.caption || alt.replace(/"/g, "&quot;");

            // Create Markdown image
            return `![${caption}](${imageUrl})`;
        } catch (error) {
            console.error("Error processing JSON:", error);
            return match; // Return original on error
        }
    });
}

async function main() {
    try {
        // Find all MD files in the content directory
        const contentDir = path.join(__dirname, "..", "content", "docs");
        console.log(`Looking for MD files in: ${contentDir}`);

        const mdFiles = await glob(`${contentDir}/**/*.mdx`);

        console.log(`Found ${mdFiles.length} MD files in ${contentDir}`);
        let convertedCount = 0;
        let errorCount = 0;

        // Process each file
        for (const filePath of mdFiles) {
            try {
                console.log(`Processing: ${filePath}`);
                const content = fs.readFileSync(filePath, "utf8");

                // Check if the file contains [block:image]
                if (content.includes("[block:image]")) {
                    const convertedContent = convertBlockImages(content);

                    // Only write if changes were made
                    if (convertedContent !== content) {
                        fs.writeFileSync(filePath, convertedContent, "utf8");
                        console.log(
                            `Converted: ${path.relative(path.resolve(), filePath)}`,
                        );
                        convertedCount++;
                    } else {
                        console.log(`No changes needed for: ${filePath}`);
                    }
                } else {
                    console.log(`No [block:image] found in: ${filePath}`);
                }
            } catch (error) {
                console.error(`Error processing file ${filePath}:`, error);
                errorCount++;
            }
        }

        console.log(`\nConversion complete!`);
        console.log(`Files converted: ${convertedCount}`);
        console.log(`Errors encountered: ${errorCount}`);
    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

main().catch(console.error);
