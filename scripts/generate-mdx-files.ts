import fs from 'node:fs';
import path from 'node:path';
import { source } from '../lib/source';
import { getLLMText } from '../lib/get-llm-text';

async function generateMDXFiles() {
  console.log('Generating MDX files for all documentation pages...');
  
  // Get all pages from the source
  const pages = source.getPages();
  
  // Process each page
  for (const page of pages) {
    try {
      // Get the URL path and convert it to a file path
      const urlPath = page.url;
      
      // Skip if not a doc page
      if (!urlPath.startsWith('/docs/')) {
        continue;
      }
      
      // Generate the MDX content
      const mdxContent = await getLLMText(page);
      
      // Create the output file path
      // Convert /docs/path/to/page to out/docs/path/to/page.mdx
      const relativePath = urlPath.slice(1); // Remove leading slash
      const outputPath = path.join('out', `${relativePath}.mdx`);
      
      // Ensure directory exists
      const outputDir = path.dirname(outputPath);
      fs.mkdirSync(outputDir, { recursive: true });
      
      // Write the file
      fs.writeFileSync(outputPath, mdxContent);
      
      console.log(`Generated: ${outputPath}`);
    } catch (error) {
      console.error(`Error generating MDX for ${page.url}:`, error);
    }
  }
  
  console.log('MDX file generation complete!');
}

// Run the script
generateMDXFiles().catch(error => {
  console.error('Failed to generate MDX files:', error);
  process.exit(1);
});