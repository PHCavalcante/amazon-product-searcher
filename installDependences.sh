#!/bin/bash

# Exit on error
set -e

printf "🚀 Starting the installation of dependencies...\n"
sleep 1

# Installs dependencies of the API
cd api/
printf "📦 Installing API dependencies...\n"
sleep 1

if bun install; then
    echo "✅ API dependencies installed successfully!"
else
    echo "❌ Error: Failed to install API dependencies!"
    exit 1
fi

# Installs dependencies of the Web application
cd ../web/
printf "🌍 Installing Web application dependencies...\n"
sleep 1

if bun install; then
    echo "✅ Web application dependencies installed successfully!"
else
    echo "❌ Error: Failed to install Web application dependencies!"
    exit 1
fi

echo "🎉 All dependencies were installed!"
