#!/bin/bash

# Development Stop Script - Stop all running services

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGS_DIR="$PROJECT_ROOT/logs"

echo -e "${YELLOW}🛑 Stopping Development Environment${NC}"
echo "===================================="

# Function to stop service by PID file
stop_service() {
    local service_name=$1
    local pid_file=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${YELLOW}Stopping $service_name (PID: $pid)...${NC}"
            kill $pid
            # Wait for process to stop
            for i in {1..10}; do
                if ! ps -p $pid > /dev/null 2>&1; then
                    break
                fi
                sleep 0.5
            done
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo -e "${YELLOW}Force stopping $service_name...${NC}"
                kill -9 $pid 2>/dev/null || true
            fi
            echo -e "${GREEN}✓ $service_name stopped${NC}"
        else
            echo -e "${YELLOW}! $service_name is not running${NC}"
        fi
        rm -f "$pid_file"
    else
        echo -e "${YELLOW}! No PID file found for $service_name${NC}"
    fi
}

# Stop Backend
stop_service "Backend" "$LOGS_DIR/backend.pid"

# Stop Frontend
stop_service "Frontend" "$LOGS_DIR/frontend.pid"

# Also kill any remaining Python/Node processes on those ports (fallback)
echo -e "\n${YELLOW}Checking for remaining processes...${NC}"

# Kill process on port 8000 (backend)
BACKEND_PORT_PID=$(lsof -ti:8000 2>/dev/null || true)
if [ ! -z "$BACKEND_PORT_PID" ]; then
    echo -e "${YELLOW}Killing process on port 8000 (PID: $BACKEND_PORT_PID)${NC}"
    kill -9 $BACKEND_PORT_PID 2>/dev/null || true
fi

# Kill process on port 3000 (frontend)
FRONTEND_PORT_PID=$(lsof -ti:3000 2>/dev/null || true)
if [ ! -z "$FRONTEND_PORT_PID" ]; then
    echo -e "${YELLOW}Killing process on port 3000 (PID: $FRONTEND_PORT_PID)${NC}"
    kill -9 $FRONTEND_PORT_PID 2>/dev/null || true
fi

echo -e "\n${GREEN}✓ All services stopped${NC}"
echo ""
echo -e "${YELLOW}To start again:${NC}"
echo "  ./dev-start.sh"
