import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  other: {
    "go-import": [
      "userclouds.com git https://github.com/userclouds/authzsdk-golang.git",
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
