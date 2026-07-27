#!/bin/sh
set -eu

api_url="${SUPER_OFFER_API_URL:-/api/v1}"

case "$api_url" in
  http://*|https://*|/api/*) ;;
  *)
    echo "SUPER_OFFER_API_URL must be an http(s) URL or an /api path" >&2
    exit 1
    ;;
esac

printf "window.SUPER_OFFER_API_URL = '%s';\n" "$api_url" \
  > frontend/dist/superoffer/browser/config.js

exec ./node_modules/.bin/serve \
  -s frontend/dist/superoffer/browser \
  -l "tcp://0.0.0.0:${PORT:-3000}"
