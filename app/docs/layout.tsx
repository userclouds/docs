import { source } from '@/lib/source';
import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  const docsOptions: DocsLayoutProps = {
    ...baseOptions,
    nav: { ...baseOptions.nav, mode: 'top' },
    tree: source.pageTree,
  };

  return (
    <DocsLayout 
      {...docsOptions}
    >
      {children}
    </DocsLayout>
  );
}