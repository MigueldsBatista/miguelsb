#!/bin/bash

# Development Start Script - Run project without Docker (Network Accessible)
# This script starts Backend (Django) and Frontend (Nuxt) services on local network

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# Get local IP address
LOCAL_IP=$(hostname -I | awk '{print $1}')

# Setup Backend
echo -e "\n${YELLOW}[1/4] Setting up Backend...${NC}"
cd "$BACKEND_DIR"

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
uv run python manage.py migrate

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo -e "\n${YELLOW}[2/4] Setting up Frontend...${NC}"
cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    if command -v bun &> /dev/null; then
        bun install
    elif command -v npm &> /dev/null; then
        npm install
    else
        echo -e "${RED}✗ Neither bun nor npm found. Please install Node.js${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Create log directory
mkdir -p "$PROJECT_ROOT/logs"

# Start services
echo -e "\n${YELLOW}[3/4] Starting services...${NC}"

# Start Backend
echo -e "${YELLOW}Starting Django backend on http://0.0.0.0:8000${NC}"
cd "$BACKEND_DIR"
source .venv/bin/activate
uv run python manage.py runserver 0.0.0.0:8000 > "$PROJECT_ROOT/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$PROJECT_ROOT/logs/backend.pid"
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo -e "${YELLOW}Starting Nuxt frontend on http://0.0.0.0:3000${NC}"
cd "$FRONTEND_DIR"
if command -v bun &> /dev/null; then
    HOST=0.0.0.0 bun run dev > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
else
    HOST=0.0.0.0 npm run dev > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
fi
FRONTEND_PID=$!
echo $FRONTEND_PID > "$PROJECT_ROOT/logs/frontend.pid"
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

# Summary
echo -e "\n${GREEN}[4/4] Development environment is ready!${NC}"
echo "======================================"
echo -e "${GREEN}✓ Backend:${NC}"
echo "    Local:   http://localhost:8000"
echo "    Network: http://$LOCAL_IP:8000"
echo ""
echo -e "${GREEN}✓ Frontend:${NC}"
echo "    Local:   http://localhost:3000"
echo "    Network: http://$LOCAL_IP:3000"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo "  Backend:  tail -f $PROJECT_ROOT/logs/backend.log"
echo "  Frontend: tail -f $PROJECT_ROOT/logs/frontend.log"
echo ""
echo -e "${YELLOW}To stop all services:${NC}"
echo "  ./dev-stop.sh"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
