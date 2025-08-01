# =============================================================================
# Project Variables & Configuration
# =============================================================================

# Define tools
BUN := bun
DOCKER := docker

# Docker image variables
IMAGE_NAME := react-app
TAG := latest

# Include the .env file if it exists
-include .env
export

# =============================================================================
# Phony Targets (Commands that are not files)
# =============================================================================

.PHONY: install run build preview lint format clean docker-build docker-run help

# Set default goal
.DEFAULT_GOAL := help

# =============================================================================
# Development Workflow
# =============================================================================

install: ## Install dependencies using Bun.
	@echo ">> Installing dependencies..."
	@$(BUN) install

run: ## Start the development server.
	@echo "🚀 Starting development server..."
	@$(BUN) run dev

build: ## Build the production app.
	@echo "🚀 Building production app..."
	@$(BUN) run build

preview: ## Preview the production app locally.
	@echo "🚀 Starting preview server..."
	@$(BUN) run preview

clean: ## Clean build artifacts (node_modules, dist, coverage).
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf node_modules dist coverage bun.lock

# =============================================================================
# Testing
# =============================================================================

test-unit: ## Run unit tests with Vitest
	@echo "🧪 Running unit tests..."
	@bun run test:unit

test-coverage: ## Run unit tests with coverage report
	@echo "📊 Running unit tests with coverage..."
	@bun run test:coverage

# =============================================================================
# Code Quality
# =============================================================================

lint: ## Lint the codebase.
	@echo "🔎 Linting code..."
	@$(BUN) run lint

format: ## Format the codebase.
	@echo "💅 Formatting code..."
	@$(BUN) run format

# =============================================================================
# Docker & Containerization
# =============================================================================

docker-build: ## Build the Docker image.
	@echo "🐳 Building Docker image..."
	@$(DOCKER) build -t $(IMAGE_NAME):$(TAG) .

docker-run: docker-build ## Run the Docker container.
	@echo "🚢 Running Docker container..."
	@$(DOCKER) run --rm -it \
	-e VITE_ENV=$(VITE_ENV) \
	-e VITE_BASE_API_URL=$(VITE_BASE_API_URL) \
	-p 3000:80 $(IMAGE_NAME):$(TAG)

# =============================================================================
# Help
# =============================================================================

help: ## Show this help message.
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets: \n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
