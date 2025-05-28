# Deploying the UserClouds Docs Site

This documentation explains how to deploy the UserClouds docs site to AWS using SST and GitHub Actions.

## Overview

This project uses:

- Next.js for the documentation site
- SST for infrastructure as code
- AWS services (S3, CloudFront, Lambda)
- GitHub Actions for CI/CD

The site is primarily built statically with the `/api/search` endpoint running as a serverless function using Next.js API routes.

## Prerequisites

- Node.js 18 or later
- pnpm
- AWS account with appropriate credentials
- GitHub repository access

## Configuration

### Environment Variables

Create a `.env` file (for local development) with the following variables:

```
# AWS region for deployment
REGION=us-east-1

# Optional: Custom domain name
DOMAIN=yourdomain.com
```

For GitHub Actions deployments, add these secrets to your repository:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DOMAIN_NAME` (optional)

### SST Configuration

The deployment uses `sst.config.ts` in the project root, which defines:

1. A Next.js site hosted on S3/CloudFront
2. Configuration for serverless functions to handle API routes and dynamic content
3. Any required resources (Buckets, etc.)

## Local Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development server:

   ```bash
   pnpm dev
   ```

3. Test the SST deployment locally:
   ```bash
   pnpm sst:dev
   ```

## Deployment

### Manual Deployment

1. Build the Next.js site:

   ```bash
   pnpm build
   ```

2. Deploy using SST:
   ```bash
   pnpm sst:deploy --stage prod
   ```

To remove the deployment:

```bash
pnpm sst:remove --stage prod
```

### GitHub Actions Deployment

The project includes a GitHub Actions workflow in `.github/workflows/deploy.yml` that:

1. Triggers on pushes to `main` and pull requests
2. Installs dependencies
3. Builds the Next.js site
4. Deploys to AWS using SST

For main branch deployments, it uses the production stage. For pull requests, it creates a temporary stage named `pr-{PR_NUMBER}`.

## Architecture Details

### Static Assets

- Next.js static files are built using `pnpm build`
- Static files are uploaded to an S3 bucket
- CloudFront serves these files with appropriate caching

### API Endpoint

- The `/api/search` endpoint is implemented as a Next.js API route
- The function is defined in `app/api/search/route.js` within the Next.js app
- SST automatically deploys this route as a serverless function
- The endpoint receives search queries and returns search results

### Custom Domain (Optional)

If a custom domain is provided:

- SSL certificate is automatically provisioned
- CloudFront distribution uses the custom domain
- DNS records are created (if using Route 53)

## Troubleshooting

### Common Issues

1. **Deployment fails with credential errors**

   - Ensure AWS credentials are correctly set up
   - Check that the IAM user has appropriate permissions

2. **Custom domain not working**

   - Verify that the domain is correctly configured in your DNS provider
   - Check that the SSL certificate has been validated

3. **API function timeout**
   - Increase the timeout setting for Next.js API routes in the SST configuration
   - Optimize the API route code for better performance
   - Consider implementing caching for frequently accessed search results

### Getting Help

If you encounter issues:

1. Check the CloudWatch logs for the Lambda functions
2. Review the CloudFormation events in the AWS console
3. Refer to the [SST documentation](https://docs.sst.dev/)

## Additional Resources

- [SST Documentation](https://docs.sst.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
