import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/userclouds/userclouds-oss',
  nav: {
    title: (
      <>
        <Image src="/logo.png" width={160} height={22} alt="UserClouds logo" className="dark:saturate-200"/>
      </>
    ),
  }
};
