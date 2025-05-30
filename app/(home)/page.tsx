import Link from "next/link";
import Image from "next/image";
import { LockIcon, ShieldIcon, UsersIcon } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center py-20 text-center px-4">
      <div className="mb-10 flex flex-col items-center gap-y-6">
        <Image
          src={`${process.env.assetPrefix}/logo.png`}
          alt="UserClouds Logo"
          width={240}
          height={33}
          className="dark:saturate-200"
          priority
        />

        <p className="text-xl text-fd-muted-foreground max-w-3xl">
          An open-source identity management platform that simplifies
          authentication, authorization, and user data handling for modern
          applications.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-white hover:bg-fd-primary/90 transition-colors"
        >
          Read Documentation
        </Link>
        <Link
          href="https://github.com/userclouds/userclouds-oss"
          className="inline-flex items-center justify-center rounded-lg border border-fd-border bg-background px-6 py-3 text-sm font-medium hover:bg-fd-primary/20 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 size-6"
          >
            <title>GitHub</title>
            <path
              className="dark:fill-white"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          GitHub
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <LockIcon className="mb-2 size-5" />
          <h3 className="text-lg font-semibold mb-2">Authentication</h3>
          <p className="text-fd-muted-foreground text-center">
            Secure, flexible user authentication system with multiple identity
            providers
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <ShieldIcon className="mb-2 size-6" />
          <h3 className="text-lg font-semibold mb-2">Authorization</h3>
          <p className="text-fd-muted-foreground text-center">
            Fine-grained access control with easy-to-implement permission models
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <UsersIcon className="mb-2 size-6" />
          <h3 className="text-lg font-semibold mb-2">User Data Management</h3>
          <p className="text-fd-muted-foreground text-center">
            Centralized user data storage with privacy-preserving tokenization
          </p>
        </div>
      </div>
    </main>
  );
}
