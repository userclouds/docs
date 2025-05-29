"use client";

import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode, ComponentType } from "react";
import DefaultSearchDialog from "@/app/components/Search";
import type { SharedProps } from "@/app/components/SearchDialog";

// Create a wrapper component that satisfies the ComponentType<SharedProps> requirement
const SearchDialogWrapper: ComponentType<SharedProps> = (props) => {
  return <DefaultSearchDialog {...props} onSearchChange={() => {}} />;
};

export default function Root({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog: SearchDialogWrapper,
      }}
    >
      {children}
    </RootProvider>
  );
}
