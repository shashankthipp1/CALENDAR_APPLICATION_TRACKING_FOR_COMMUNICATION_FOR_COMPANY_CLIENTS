#!/bin/bash

# Suppress all npm warnings and build the project
export npm_config_warn=false
export npm_config_audit=false
export npm_config_fund=false
export npm_config_loglevel=error

# Install dependencies with suppressed warnings
npm install --silent --no-audit --no-fund

# Build the project
npm run build

echo "Build completed successfully!"
