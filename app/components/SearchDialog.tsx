"use client";

import { useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";

export interface SharedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchDialogProps extends SharedProps {
  onSearchChange?: (v: string) => void;
}

export function SearchDialog({
  open,
  onOpenChange,
  onSearchChange,
}: SearchDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearch = useCallback((query: string) => {
    // create a new tab and append the search query
    window.open(
      `https://www.google.com/search?q=site:userclouds.com${encodeURIComponent(` ${query}`)}`,
      "_blank",
    );
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [onOpenChange]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const query = formData.get("search") as string;
      if (query) {
        handleSearch(query);
        onSearchChange?.(query);
      }
    },
    [handleSearch, onSearchChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in" />
      <DialogContent
        aria-describedby={undefined}
        className="fixed left-1/2 top-[10vh] z-50 w-[98vw] max-w-screen-sm -translate-x-1/2 rounded-lg border bg-fd-popover text-fd-popover-foreground shadow-lg data-[state=closed]:animate-fd-dialog-out data-[state=open]:animate-fd-dialog-in"
      >
        <DialogTitle className="hidden">Search…</DialogTitle>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-row items-center gap-2 px-3"
        >
          <input
            name="search"
            defaultValue=""
            placeholder="Search…"
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-0 flex-1 bg-transparent py-3 text-base placeholder:text-fd-muted-foreground focus-visible:outline-none"
          />
          <button
            type="button"
            aria-label="Close Search"
            onClick={handleClose}
            className="text-xs p-1.5 flex items-center gap-2 "
          >
            <kbd className="rounded-md border bg-fd-background p-1.5">Esc</kbd>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
