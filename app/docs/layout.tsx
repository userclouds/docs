import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  const options = {
    ...baseOptions,
    tree: source.pageTree,
    sidebar: {
      tabs: [
        {
          title: 'Documentation',
          icon: '🚀',
          url: '/docs',
          description: 'Guides and definitions',
        },
        {
          title: 'Reference',
          text: 'Reference',
          icon: '🔍',
          url: '/docs/reference',
          description: 'API reference',
        },
      ],
    },
  };

  return (
    <DocsLayout {...options}>
      {children}
    </DocsLayout>
  );
}
