#!/bin/bash

# Development Status Script - Check status of all services

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGS_DIR="$PROJECT_ROOT/logs"

echo -e "${GREEN}📊 Development Environment Status${NC}"
echo "=================================="
echo ""

# Check PostgreSQL
echo -e "${YELLOW}PostgreSQL:${NC}"
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓ Running on localhost:5432${NC}"
else
    echo -e "  ${RED}✗ Not running${NC}"
fi

# Check Backend
echo -e "\n${YELLOW}Backend (Django):${NC}"
if [ -f "$LOGS_DIR/backend.pid" ]; then
    BACKEND_PID=$(cat "$LOGS_DIR/backend.pid")
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Running (PID: $BACKEND_PID)${NC}"
        echo -e "  ${GREEN}✓ http://localhost:8000${NC}"
        # Test if responding
        if curl -s http://localhost:8000 > /dev/null 2>&1; then
            echo -e "  ${GREEN}✓ Responding to requests${NC}"
        fi
    else
        echo -e "  ${RED}✗ Not running (PID file exists but process is dead)${NC}"
    fi
else
    echo -e "  ${RED}✗ Not running${NC}"
fi

# Check Frontend
echo -e "\n${YELLOW}Frontend (Nuxt):${NC}"
if [ -f "$LOGS_DIR/frontend.pid" ]; then
    FRONTEND_PID=$(cat "$LOGS_DIR/frontend.pid")
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓ Running (PID: $FRONTEND_PID)${NC}"
        echo -e "  ${GREEN}✓ http://localhost:3000${NC}"
        # Test if responding
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo -e "  ${GREEN}✓ Responding to requests${NC}"
        fi
    else
        echo -e "  ${RED}✗ Not running (PID file exists but process is dead)${NC}"
    fi
else
    echo -e "  ${RED}✗ Not running${NC}"
fi

echo ""
