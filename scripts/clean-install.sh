#!/bin/bash

# Script to clean and reinstall dependencies
echo "Cleaning old dependencies..."
rm -rf node_modules
rm -f package-lock.json

echo "Installing fresh dependencies..."
npm install --legacy-peer-deps

echo "Done! Dependencies cleaned and reinstalled."
