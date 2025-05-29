import { source } from '@/lib/source';
import { getLLMFullText } from '@/lib/get-llm-text';
import type { Metadata } from 'next';

// Force static generation
export const dynamic = 'force-static';

// Main page component that renders as plain text
export default async function LLMFullTextPage() {
  const pages = source.getPages();
  const contentPromises = pages.map(getLLMFullText);
  const contents = await Promise.all(contentPromises);
  const fullContent = contents.join('\n\n');
  
  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
      margin: 0,
      padding: 0
    }}>
      {fullContent}
    </pre>
  );
}

// Set the metadata to indicate this is a plain text file
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'LLM Full Text Export',
    other: {
      'content-type': 'text/plain',
    },
  };
}