#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

DEPLOY_BRANCH="deploy"
BUILD_DIR="out"

echo "==> Building site"
pnpm build

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory '$BUILD_DIR' not found. Aborting."
  exit 1
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  git -C "$ROOT_DIR" worktree remove -f "$TMP_DIR" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if git show-ref --verify --quiet "refs/heads/$DEPLOY_BRANCH"; then
  existing_path="$(git worktree list --porcelain | awk -v b="$DEPLOY_BRANCH" '
    $1=="worktree"{path=$2}
    $1=="branch" && $2=="refs/heads/"b{print path}
  ')"
  if [[ -n "${existing_path:-}" ]]; then
    git worktree remove -f "$existing_path"
  fi
  git worktree add "$TMP_DIR" "$DEPLOY_BRANCH"
else
  git worktree add -b "$DEPLOY_BRANCH" "$TMP_DIR"
fi

echo "==> Syncing build output to deploy branch"
rsync -a --delete --exclude ".git" "$BUILD_DIR"/ "$TMP_DIR"/

git -C "$TMP_DIR" add -A
if git -C "$TMP_DIR" diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

git -C "$TMP_DIR" commit -m "Deploy $(date +%Y-%m-%d\ %H:%M:%S)"
git -C "$TMP_DIR" push -f origin "$DEPLOY_BRANCH"

echo "==> Cleaning up"
rm -f *.html *.txt
rm -rf out

echo "==> Deploy complete"
