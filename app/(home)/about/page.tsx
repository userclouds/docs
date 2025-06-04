import Link from "next/link";
import Image from "next/image";
import { BookOpenIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center py-16 px-4 max-w-4xl mx-auto">
      <div className="mb-10 flex flex-col items-center gap-y-6">
        <Image
          src="/logo.png"
          alt="UserClouds Logo"
          width={240}
          height={33}
          className="dark:saturate-200"
          priority
        />
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-center mb-8">
          Open-Sourcing UserClouds
        </h1>

        <p className="text-lg text-fd-muted-foreground">
          The team at UserClouds has decided to{" "}
          <a
            href="https://www.linkedin.com/posts/stgarrity_im-rejoining-microsoft-after-a-17-year-hiatus-activity-7330638497344638976-UZpE"
            className="text-fd-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            wind down
          </a>{" "}
          <a
            href="https://www.linkedin.com/posts/vladimir-fedorov-b2a9302_im-excited-to-share-that-ive-joined-the-activity-7330323992190275584-jV__"
            className="text-fd-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            our journey
          </a>
          . As we do this, we&apos;re excited to announce that we&apos;re
          open-sourcing our codebase to allow the community to build on our
          work.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">About UserClouds</h2>
        <p>
          UserClouds was designed to provide organizations with granular control
          over sensitive data access. Our platform offers:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Visibility</span>:
            Comprehensive insights into data access patterns.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Control</span>:
            Fine-grained, context-aware access policies.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Minimization</span>:
            Tools to reduce data sprawl through tokenization and masking.
          </li>
        </ul>
        <p className="mt-4">
          These capabilities helped enterprises enforce least privilege access,
          comply with data residency laws, such as GDPR and CCPA, and integrate
          securely with modern technologies, such as LLMs, Snowflake &
          Databricks, etc.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Open-Source?</h2>
        <p>
          We believe in the power of community and the importance of this work.
          Open-sourcing UserClouds is motivated by:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Preservation</span>:
            Our work can continue to benefit organizations.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Collaboration</span>
            : Developers can adapt and enhance the platform to fit diverse
            needs.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Education</span>:
            Others can learn from our approaches to data security and privacy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Accessing the Code</h2>
        <p>
          Our codebase is now available at{" "}
          <a
            href="https://github.com/userclouds/userclouds-oss"
            className="text-fd-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/userclouds/userclouds-oss
          </a>
          . Here&apos;s what you&apos;ll find:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">
              Core Components
            </span>
            : The primary modules that powered UserClouds.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Documentation</span>
            : Guides to help you understand and deploy the system.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Examples</span>:
            Sample configurations and use cases.
          </li>
        </ul>
        <p className="mt-4">
          We welcome contributions and feedback from the community to further
          improve and adapt the platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Documentation & Use Cases
        </h2>
        <p>
          To assist users in navigating and utilizing the open-source version of
          UserClouds, we&apos;ve provided detailed documentation covering:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">
              Deployment Guides
            </span>
            : Step-by-step instructions for setting up the platform.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">
              Policy Configuration
            </span>
            : How to define and enforce access controls.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">
              Integration Examples
            </span>
            : Connecting UserClouds with existing systems.
          </li>
        </ul>
        <p className="mt-4">
          These resources aim to make it as straightforward as possible for
          organizations to adopt and benefit from UserClouds.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Acknowledgments</h2>
        <p>We extend our deepest gratitude to:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Our Customers</span>
            : For trusting us with their data security needs.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Our Team</span>: For
            their dedication and innovation.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">The Community</span>
            : For inspiring us to embrace open-source.
          </li>
        </ul>
        <p className="mt-4">
          Your support has been invaluable, and we look forward to seeing how
          the community builds upon our foundation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Stay Connected</h2>
        <p>
          While UserClouds as a company is winding down, our commitment to data
          security and privacy continues. For updates, discussions, or to share
          how you&apos;re using the open-source version, please reach out via:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">Email</span>:{" "}
            <a
              href="mailto:team@userclouds.com"
              className="text-fd-primary hover:underline"
            >
              team@userclouds.com
            </a>
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">GitHub Issues</span>
            : For bugs or feature requests.
          </li>
          <li className="text-fd-muted-foreground">
            <span className="font-semibold text-foreground">
              GitHub Discussions
            </span>
            : Engage with other users and contributors.
          </li>
        </ul>
        <p className="mt-4">
          By open-sourcing UserClouds, we hope to contribute meaningfully to the
          broader community and continue our mission of enhancing data security
          and privacy.
        </p>

        <p className="mt-8 text-center font-medium">
          Thank you for being part of our journey.
        </p>
        <p className="text-center mb-8">The UserClouds Team</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-white hover:bg-fd-primary/90 transition-colors"
        >
          <BookOpenIcon className="mr-2 size-4" />
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
            className="mr-2 size-5"
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
    </main>
  );
}
