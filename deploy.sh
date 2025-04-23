#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building and deploying kftray-blog with SSR...${NC}"

# Check if any containers are running and stop them
if docker-compose ps | grep -q "Up"; then
  echo -e "${YELLOW}Stopping existing containers...${NC}"
  docker-compose down
fi

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker-compose build

# Start the containers
echo -e "${YELLOW}Starting containers...${NC}"
docker-compose up -d

# Show container status
echo -e "${YELLOW}Container status:${NC}"
docker-compose ps

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}Your site is now available at http://localhost:8080${NC}"
echo -e "${YELLOW}-----------------------------------${NC}"
echo -e "${YELLOW}Test multi-language URLs like:${NC}"
echo -e "${GREEN}http://localhost:8080/blog/posts/13-kftray-manage-all-k8s-port-forward?lang=pt${NC}"
echo -e "${YELLOW}It should redirect to:${NC}"
echo -e "${GREEN}http://localhost:8080/blog/posts/pt/13-kftray-manage-all-k8s-port-forward${NC}"