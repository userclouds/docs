"use client";
import type { ReactNode } from "react";
import { SearchDialog, type SharedProps } from "./SearchDialog";

export interface DefaultSearchDialogProps extends SharedProps {
  /**
   * @defaultValue 'static'
   */
  type?: "fetch" | "static";
  onSearchChange?: (value: string) => void;
}

export default function DefaultSearchDialog({
  ...props
}: DefaultSearchDialogProps): ReactNode {
  return <SearchDialog {...props} />;
}
