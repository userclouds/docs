import { generateFiles } from 'fumadocs-openapi';
void generateFiles({
  // the OpenAPI schema
  input: ['./**/openapi/**.yaml', './**/openapi/**.json'],
    // the output directory
  output: './content/reference',
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
  groupByFolder: true,
  groupBy: true
});