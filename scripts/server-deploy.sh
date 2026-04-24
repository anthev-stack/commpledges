#!/usr/bin/env bash
# Run on the Vultr server after SSH (or from GitHub Actions via ssh-action).
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/commpledges}"
cd "$APP_DIR"

export NODE_ENV=production

git fetch origin
git checkout main
git reset --hard origin/main

npm ci
npm run build

if pm2 describe commpledges >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
