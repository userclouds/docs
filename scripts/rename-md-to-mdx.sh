#!/bin/bash
# Usage: ./rename_md_to_mdx.sh [directory]
DIR="${1:-.}"
find "$DIR" -type f -name "*.md" | while read -r file; do
  mv "$file" "${file%.md}.mdx"
done