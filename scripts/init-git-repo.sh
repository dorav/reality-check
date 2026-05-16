#!/usr/bin/env bash
set -euo pipefail

git init
git add .
git commit -m "Initial Reality Check skill plugin"

echo "Reality Check git repository initialized."
echo "Next: create a remote repo, for example:"
echo "  gh repo create dorav/reality-check --private --source=. --remote=origin --push"
