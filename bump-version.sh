#!/bin/sh
# Stamps css/js links with a version based on file contents, so browsers
# always load the latest files after a deploy. Run before committing:
#   ./bump-version.sh
cd "$(dirname "$0")"
V=$(cat css/style.css js/main.js | shasum | cut -c1-8)
for f in *.html; do
  sed -i '' -E "s#css/style\.css(\?v=[a-z0-9]+)?\"#css/style.css?v=$V\"#; s#js/main\.js(\?v=[a-z0-9]+)?\"#js/main.js?v=$V\"#" "$f"
done
echo "Asset version: $V"
