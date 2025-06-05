import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "go-import": [
      "userclouds.com git userclouds.com git https://github.com/userclouds/sdk-golang.git",
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "Documentation",
          url: "/docs",
        },
        {
          text: "About",
          url: "/about",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
