#!/bin/bash
# SEO Technical Checklist
BASE="http://localhost:3001"

ROUTES=(
  "/"
  "/projects"
  "/projects/geodnet"
  "/projects/malama-labs"
  "/projects/aethir"
  "/categories/compute"
  "/categories/sensors"
  "/chains/solana"
  "/compare/geodnet-vs-onocoy"
  "/best/sensors"
  "/tools/roi-calculator"
  "/tools/compare"
  "/blog"
  "/blog/geodnet-miner-review-roi"
  "/podcasts"
  "/podcasts/085-geodnet-rtk"
  "/events"
  "/academy"
  "/academy/introduction-to-depin"
  "/get-verified"
  "/advertise"
)

echo "=== 1. ALL ROUTES RETURN 200 ==="
for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}${route}")
  if [ "$STATUS" != "200" ]; then
    echo "  FAIL: $route -> $STATUS"
  fi
done
echo "  Done (${#ROUTES[@]} routes checked)"

echo ""
echo "=== 2. UNIQUE TITLES ==="
TITLE_FILE=$(mktemp)
for route in "${ROUTES[@]}"; do
  TITLE=$(curl -s "${BASE}${route}" | grep -o '<title>[^<]*</title>' | head -1)
  echo "$TITLE|||$route" >> "$TITLE_FILE"
done
TOTAL=$(wc -l < "$TITLE_FILE" | tr -d ' ')
UNIQUE=$(cut -d'|' -f1-3 "$TITLE_FILE" | sort -u | wc -l | tr -d ' ')
echo "  Total: $TOTAL, Unique: $UNIQUE"
rm "$TITLE_FILE"

echo ""
echo "=== 3. CANONICAL ON EVERY PAGE ==="
MISSING=0
for route in "${ROUTES[@]}"; do
  HAS=$(curl -s "${BASE}${route}" | grep -c 'canonical')
  if [ "$HAS" -eq 0 ]; then
    echo "  MISSING canonical: $route"
    MISSING=$((MISSING+1))
  fi
done
echo "  Missing: $MISSING"

echo ""
echo "=== 4. NO EM DASHES ==="
for route in "${ROUTES[@]}"; do
  TITLE=$(curl -s "${BASE}${route}" | grep -o '<title>[^<]*</title>')
  if echo "$TITLE" | grep -q '—'; then
    echo "  EM DASH: $TITLE"
  fi
done
echo "  Done"

echo ""
echo "=== 5. SITEMAP ==="
URL_COUNT=$(curl -s "${BASE}/sitemap.xml" | grep -c '<url>')
echo "  URLs in sitemap: $URL_COUNT"

echo ""
echo "=== 6. ROBOTS ==="
curl -s "${BASE}/robots.txt"

echo ""
echo "=== 7. JSON-LD TYPE COVERAGE ==="
for st in Organization WebSite Product BreadcrumbList ItemList Article PodcastEpisode Event Course SoftwareApplication FAQPage; do
  COUNT=0
  for route in "${ROUTES[@]}"; do
    HAS=$(curl -s "${BASE}${route}" | grep -c "\"$st\"")
    COUNT=$((COUNT+HAS))
  done
  echo "  $st: $COUNT"
done
