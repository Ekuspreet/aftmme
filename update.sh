#!/usr/bin/env bash

set -euo pipefail

# Usage:
# ./push-build.sh "commit message" [remote] [branch]
#
# Examples:
# ./push-build.sh "Update website"
# ./push-build.sh "Update website" origin
# ./push-build.sh "Update website" origin main

COMMIT_MESSAGE="${1:-}"
REMOTE="${2:-origin}"
BRANCH="${3:-}"

if [[ -z "$COMMIT_MESSAGE" ]]; then
    echo "Usage: $0 \"commit message\" [remote] [branch]"
    exit 1
fi

git_push_workflow() {
    local repository_name="$1"
    local selected_branch="$BRANCH"

    if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "Error: $repository_name is not a Git repository."
        exit 1
    fi

    # Use the repository's current branch when no branch was provided.
    if [[ -z "$selected_branch" ]]; then
        selected_branch="$(git branch --show-current)"
    fi

    if [[ -z "$selected_branch" ]]; then
        echo "Error: Could not determine the branch for $repository_name."
        exit 1
    fi

    echo
    echo "Processing $repository_name..."
    echo "Remote: $REMOTE"
    echo "Branch: $selected_branch"

    git add .

    # Avoid failing when there are no changes to commit.
    if git diff --cached --quiet; then
        echo "No changes to commit in $repository_name."
    else
        git commit -m "$COMMIT_MESSAGE"
    fi

    git push "$REMOTE" "$selected_branch"
}

# Push the current repository.
git_push_workflow "main repository"

# Build the project.
echo
echo "Running npm build..."
npm run build

# Move into the second repository.
if [[ ! -d "aftmme-web" ]]; then
    echo "Error: aftmme-web directory was not found."
    exit 1
fi

cd "aftmme-web"

# Push the aftmme-web repository.
git_push_workflow "aftmme-web"

echo
echo "Build and both Git workflows completed successfully."