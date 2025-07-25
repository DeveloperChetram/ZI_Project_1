Write-Host "🚀 Starting Backend Server Setup..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

# Check if .env file exists and has required variables
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGO_URI=mongodb://localhost:27017/excel_analytics
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env file created" -ForegroundColor Green
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
    
    # Check if MONGO_URI is missing
    $envContent = Get-Content ".env"
    if ($envContent -notcontains "MONGO_URI=*") {
        Write-Host "📝 Adding MONGO_URI to .env..." -ForegroundColor Yellow
        "MONGO_URI=mongodb://localhost:27017/excel_analytics" | Add-Content ".env"
    }
    
    # Check if JWT_SECRET is missing
    if ($envContent -notcontains "JWT_SECRET=*") {
        Write-Host "📝 Adding JWT_SECRET to .env..." -ForegroundColor Yellow
        "JWT_SECRET=your_super_secret_jwt_key_change_this_in_production" | Add-Content ".env"
    }
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Check if MongoDB is running (optional check)
Write-Host "🔍 Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    if ($mongoProcess) {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB is not running. You may need to start it manually." -ForegroundColor Yellow
        Write-Host "   Or use MongoDB Atlas (cloud database)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  MongoDB not found. Consider using MongoDB Atlas." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Starting server on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Start the server
npm run dev 