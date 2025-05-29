import { source } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Force static generation
export const dynamic = 'force-static';

// Main page component
export default async function MDXPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params;
  const page = source.getPage(slug || []);
  
  if (!page) notFound();

  const content = await getLLMText(page);
  
  // This will be rendered as plain text
  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
      margin: 0,
      padding: 0
    }}>
      {content}
    </pre>
  );
}

// Generate all possible page paths at build time
export function generateStaticParams() {
  return source.generateParams();
}

// This metadata tells Next.js to use text/plain content type for this route
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  await params; // Ensure params are resolved
  return {
    other: {
      'content-type': 'text/plain',
    },
  };
}