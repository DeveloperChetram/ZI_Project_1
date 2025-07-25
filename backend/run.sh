#!/bin/bash

echo "🚀 Starting Backend Server Setup..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Check if .env file exists and has required variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/excel_analytics
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file exists"
    
    # Check if MONGO_URI is missing
    if ! grep -q "MONGO_URI" .env; then
        echo "📝 Adding MONGO_URI to .env..."
        echo "MONGO_URI=mongodb://localhost:27017/excel_analytics" >> .env
    fi
    
    # Check if JWT_SECRET is missing
    if ! grep -q "JWT_SECRET" .env; then
        echo "📝 Adding JWT_SECRET to .env..."
        echo "JWT_SECRET=your_super_secret_jwt_key_change_this_in_production" >> .env
    fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies!"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if MongoDB is running (optional check)
echo "🔍 Checking MongoDB connection..."
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. You may need to start it manually."
        echo "   Or use MongoDB Atlas (cloud database)"
    fi
else
    echo "⚠️  MongoDB not found. Consider using MongoDB Atlas."
fi

echo ""
echo "🎯 Starting server on http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo "=================================="
echo ""

# Start the server
npm run dev 