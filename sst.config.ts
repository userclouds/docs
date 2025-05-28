import type { SSTConfig } from "sst";
import { NextjsSite, Bucket } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "docs",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Create a bucket for storing any assets if needed
      const bucket = new Bucket(stack, "DocsAssets");

      // Create the Next.js site
      const site = new NextjsSite(stack, "DocsSite", {
        path: ".",
        buildCommand: "pnpm build",
        environment: {
          // Add environment variables that your Next.js site needs
          SEARCH_INDEX_PATH: `${bucket.bucketName}/search-index.json`,
        },
        customDomain: process.env.DOMAIN
          ? {
              domainName: process.env.DOMAIN,
              domainAlias: `www.${process.env.DOMAIN}`,
            }
          : undefined,
        // Configure for both static site and serverless API routes
        // defaults: {
        //   function: {
        //     // Configure permissions for the Lambda functions (including API routes)
        //     permissions: [bucket],
        //   },
        // },
        // Specify that API routes should be handled by Lambda
        // caching: {
        //   // Cache static assets
        //   assets: {
        //     maxAge: 60 * 60 * 24 * 365, // 1 year
        //   },
        //   // Don't cache API routes
        //   api: {
        //     maxAge: 0,
        //   },
        // },
        cdk: {
          // Customize the CloudFront distribution if needed
          distribution: {
            comment: "Site + Documentation",
          },
        },
        // Link to resources
        bind: [bucket],
      });

      // Output the site URL
      stack.addOutputs({
        SiteUrl: site.url,
      });

      return {
        site,
        bucket,
      };
    });
  },
} satisfies SSTConfig;
