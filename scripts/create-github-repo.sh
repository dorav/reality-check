#!/usr/bin/env bash
set -euo pipefail

repo="${1:-dorav/reality-check}"
visibility="${2:---private}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI 'gh' is required for this helper script." >&2
  exit 1
fi

gh repo create "$repo" "$visibility" --source=. --remote=origin --push
