#!/bin/bash
echo "Initializing ExpressJS Project Directory Structure..."

# Create root directories
mkdir -p config controllers middlewares models routes services utils

# Add .gitkeep files to each directory
mkdir config
mkdir controllers
mkdir middlewares
mkdir models
mkdir routes
mkdir services
mkdir utils

# Create files in the root directory
touch .env

echo "Directory structure initialized successfully."
