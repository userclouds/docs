import "./global.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import RootProvider from "./RootProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | UserClouds",
    default: "UserClouds Documentation",
  },
  description: "Official documentation for UserClouds",
  metadataBase: new URL("https://docs.userclouds.com"),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png" }],
    apple: { url: "/icon.png" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.userclouds.com",
    siteName: "UserClouds Documentation",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "UserClouds Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
