import { generateFiles } from 'fumadocs-openapi';
void generateFiles({
  // the OpenAPI schema
  input: ['./**/content/openapi/**.yaml', './**/content/openapi/**.json'],
    // the output directory
  output: './content/docs/reference/(generated)',
  includeDescription: true,
  per: "operation",
  groupBy: "route"
});