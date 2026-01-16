#!/bin/bash

# Development Logs Script - View logs for backend and frontend

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGS_DIR="$PROJECT_ROOT/logs"

echo -e "${GREEN}📋 Development Logs${NC}"
echo "==================="
echo ""
echo -e "${YELLOW}Press Ctrl+C to exit${NC}"
echo ""

# Create logs directory if it doesn't exist
mkdir -p "$LOGS_DIR"

# Touch log files if they don't exist
touch "$LOGS_DIR/backend.log"
touch "$LOGS_DIR/frontend.log"

# Tail both logs with labels
tail -f "$LOGS_DIR/backend.log" "$LOGS_DIR/frontend.log" | awk '
  /==> / { service = $0; next }
  {
    if (service ~ /backend/) {
      printf "\033[0;36m[Backend]\033[0m %s\n", $0
    } else if (service ~ /frontend/) {
      printf "\033[0;35m[Frontend]\033[0m %s\n", $0
    }
  }
'
