import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import Glossary from '@/app/components/Glossary';
import { openapi } from '@/lib/source';
import { APIPage } from 'fumadocs-openapi/ui';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage: (props) => <APIPage 
      {...openapi.getAPIPageProps(props)} 
      disablePlayground={false}
      showResponseSchema={true}
    />,
    Glossary,
    ...components,
  };
}
