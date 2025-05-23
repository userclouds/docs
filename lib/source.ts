import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { attachFile, createOpenAPI } from 'fumadocs-openapi/server';
import { createElement } from 'react';
import { icons } from 'lucide-react';

export const source = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI({
  shikiOptions: {
    themes: {
      dark: 'monokai',
      light: 'min-light',
    },
  }
});