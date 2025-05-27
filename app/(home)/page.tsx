import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center py-20 text-center px-4">
      <div className="mb-10 flex flex-col items-center gap-y-6">
        <Image 
          src="/logo.png" 
          alt="UserClouds Logo" 
          width={240} 
          height={33} 
          className="dark:saturate-200"
          priority
        />

        <p className="text-xl text-fd-muted-foreground max-w-3xl">
          An open-source identity management platform that simplifies authentication, authorization, 
          and user data handling for modern applications.
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
          className="inline-flex items-center justify-center rounded-lg border border-fd-border bg-background px-6 py-3 text-sm font-medium hover:bg-fd-muted/50 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          GitHub
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-fd-primary">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Authentication</h3>
          <p className="text-fd-muted-foreground text-center">Secure, flexible user authentication system with multiple identity providers</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-fd-primary">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Authorization</h3>
          <p className="text-fd-muted-foreground text-center">Fine-grained access control with easy-to-implement permission models</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-fd-card rounded-lg border border-fd-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-fd-primary">
            <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M2 10h20" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">User Data Management</h3>
          <p className="text-fd-muted-foreground text-center">Centralized user data storage with privacy-preserving tokenization</p>
        </div>
      </div>
    </main>
  );
}
