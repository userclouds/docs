import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  const options = {
    ...baseOptions,
    tree: source.pageTree,
    links: [
      {
        text: 'Welcome to the UserCloud docs!',
        url: '/docs',
      },
    ],
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
  console.log(options);
  return (
    <DocsLayout {...options}>
      {children}
    </DocsLayout>
  );
}
