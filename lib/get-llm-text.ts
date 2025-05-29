import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { remarkInclude } from "fumadocs-mdx/config";
import { source } from "./source";
import type { InferPageType } from "fumadocs-core/source";
// We need the actual source import for runtime code, not just its type

const processor = remark().use(remarkMdx).use(remarkInclude).use(remarkGfm);

// We use the imported source object for its type
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  return `# ${page.data.title}
URL: ${page.url}

${page.data.description || ""}

${processed.value}`;
}

// We use the imported source object for its type
export async function getLLMFullText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  // Extract metadata that might exist in the page data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata: Record<string, string> = {};

  // Add additional metadata if available
  // (These are common in Fumadocs but may not be in the type)
  if ("date" in page.data) {
    metadata.created = new Date(page.data.date as string).toISOString();
  }

  if (page.data._file && "lastModified" in page.data._file) {
    metadata.lastModified = new Date(
      page.data._file.lastModified as number,
    ).toISOString();
  }

  // Build tags if they exist
  let tagsSection = "";
  if ("tags" in page.data && Array.isArray(page.data.tags)) {
    tagsSection = `\nTags: ${(page.data.tags as string[]).join(", ")}`;
  }

  return `# ${page.data.title}
URL: ${page.url}
${metadata.created ? `Created: ${metadata.created}` : ""}
${metadata.lastModified ? `Last Modified: ${metadata.lastModified}` : ""}

${page.data.description || ""}

${processed.value}
${tagsSection}`;
}
