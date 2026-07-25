#!/bin/bash
###
# start-tiktok-agents.sh
# Set up cron jobs for TikTok producer (daily 6 AM) and analyst (Sunday 6 PM)
#
# Usage:
#   chmod +x scripts/start-tiktok-agents.sh
#   ./scripts/start-tiktok-agents.sh
###

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOGS_DIR="$PROJECT_ROOT/logs"

echo "Setting up TikTok autonomous posting system..."
echo "Project root: $PROJECT_ROOT"

# Create logs directory
mkdir -p "$LOGS_DIR"
echo "✓ Logs directory created at $LOGS_DIR"

# Define cron jobs
PRODUCER_CRON="0 6 * * * cd $PROJECT_ROOT && node agents/tiktok-producer.mjs >> $LOGS_DIR/producer.log 2>&1"
ANALYST_CRON="0 18 * * 0 cd $PROJECT_ROOT && node agents/tiktok-analyst.mjs >> $LOGS_DIR/analyst.log 2>&1"

# Get current crontab
CURRENT_CRON=""
if crontab -l 2>/dev/null; then
  CURRENT_CRON=$(crontab -l 2>/dev/null)
fi

# Check if jobs already exist
if echo "$CURRENT_CRON" | grep -q "tiktok-producer.mjs"; then
  echo "✓ Producer job already exists in crontab"
else
  echo "$CURRENT_CRON" | (cat; echo "$PRODUCER_CRON") | crontab -
  echo "✓ Producer job added: 6:00 AM every day"
fi

if echo "$CURRENT_CRON" | grep -q "tiktok-analyst.mjs"; then
  echo "✓ Analyst job already exists in crontab"
else
  echo "$CURRENT_CRON" | (cat; echo "$ANALYST_CRON") | crontab -
  echo "✓ Analyst job added: 6:00 PM every Sunday"
fi

# Add to .gitignore
GITIGNORE="$PROJECT_ROOT/.gitignore"
if ! grep -q "^logs/" "$GITIGNORE" 2>/dev/null; then
  echo "logs/" >> "$GITIGNORE"
  echo "✓ Added logs/ to .gitignore"
fi

if ! grep -q "^dist/cards/" "$GITIGNORE" 2>/dev/null; then
  echo "dist/cards/" >> "$GITIGNORE"
  echo "✓ Added dist/cards/ to .gitignore"
fi

if ! grep -q "^tiktok-publish-queue.json" "$GITIGNORE" 2>/dev/null; then
  echo "tiktok-publish-queue.json" >> "$GITIGNORE"
  echo "✓ Added tiktok-publish-queue.json to .gitignore"
fi

echo ""
echo "=== SETUP COMPLETE ==="
echo ""
echo "Scheduled jobs:"
echo "  Producer: Daily at 6:00 AM → renders cards, uploads to TikTok drafts"
echo "  Analyst:  Sundays at 6:00 PM → analyzes performance, regenerates content queue"
echo ""
echo "Check your crontab:"
echo "  crontab -l"
echo ""
echo "View logs:"
echo "  tail -f $LOGS_DIR/producer.log"
echo "  tail -f $LOGS_DIR/analyst.log"
echo ""
echo "Manual test:"
echo "  node agents/tiktok-producer.mjs"
echo "  node agents/tiktok-analyst.mjs"
echo ""
echo "Requirements:"
echo "  - TIKTOK_ACCESS_TOKEN env var set in .env or exported"
echo "  - Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)"
echo "  - Playwright/Chromium installed (npm install)"
echo ""
