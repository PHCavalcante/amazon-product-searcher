#!/bin/bash

# Exit on error
set -e

printf "🚀 Starting script...\n"
sleep 1

# Enters in API directory
cd api/
printf "📡 Starting API...\n"
sleep 1

# Verifies if API is already running
api_pid=$(pgrep -f "bun run dev")

if [ -n "$api_pid" ]; then
    echo "⚠️  API is already running with PID: $api_pid"
else
    bun run dev & disown
    sleep 2
    api_pid=$(pgrep -f "bun run dev")
    
    if [ -n "$api_pid" ]; then
        echo "✅ API started successfully! PID: $api_pid"
    else
        echo "❌ Error: failed to start API!"
        exit 1
    fi
fi

# Enters in Web directory
cd ../web/

printf "🌍 Starting web application...\n"
sleep 1

# Start web application
bun run dev & disown
sleep 2

web_pid=$(pgrep -f "bun run dev")

if [ -n "$web_pid" ]; then
    echo "✅ application started successfully! PID: $web_pid"
else
    echo "❌ Error: failed to start web application!"
    exit 1
fi

echo "🎉 Everything up and running!"
