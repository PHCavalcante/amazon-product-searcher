#!/bin/bash
set -e

# Stores the PIDs of the processes
api_pid=""
web_pid=""

# Cleaning function that runs when exiting
cleanup() {
    echo "🧹 Cleaning up processes..."

    if [ -n "$web_pid" ] && kill -0 "$web_pid" 2>/dev/null; then
        echo "🔻 Finalizing Web (PID: $web_pid)..."
        kill "$web_pid"
        wait "$web_pid" 2>/dev/null
    fi

    if [ -n "$api_pid" ] && kill -0 "$api_pid" 2>/dev/null; then
        echo "🔻 Finalizing API (PID: $api_pid)..."
        kill "$api_pid"
        wait "$api_pid" 2>/dev/null
    fi

    echo "🚪 Exiting script..."
}

# Set traps to exit cleanly
trap cleanup EXIT INT TERM

echo "🚀 Starting script..."
sleep 1

### ===== Starts the API =====
cd api/
echo "📡 Starting API..."
sleep 1

bun run dev &
api_pid=$!

sleep 3

if kill -0 "$api_pid" 2>/dev/null; then
    echo "✅ API started successfully! PID: $api_pid"
    echo "🔗 API URL: http://localhost:3000"
else
    echo "❌ Error: failed to start API!"
    exit 1
fi

cd ../web/

### ===== Starts the App (Web) =====
echo "🌍 Starting web application..."
sleep 1

bun run dev &
web_pid=$!

sleep 3

if kill -0 "$web_pid" 2>/dev/null; then
    echo "✅ Web application started successfully! PID: $web_pid"
    echo "🔗 Web URL: http://localhost:5173"
else
    echo "❌ Error: failed to start web application!"
    exit 1
fi

echo "🎉 Everything up and running!"
echo "🕹️ Press Ctrl+C to exit and stop the app"

# Keeps the script alive until the user interrupts it with Ctrl+C
wait
