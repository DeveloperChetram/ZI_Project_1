# Backend Setup Guide

## Prerequisites

### 1. Install Node.js
- Download from: https://nodejs.org/
- Install the LTS version
- Restart terminal after installation

### 2. Install MongoDB
**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install MongoDB Community Server
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Go to: https://www.mongodb.com/atlas
- Create free account
- Create cluster
- Get connection string
- Update `.env` file with your connection string

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows
   net start MongoDB
   
   # Or start MongoDB service from Services
   ```

3. **Run the Backend**
   ```bash
   npm run dev
   ```

## Environment Variables

The `.env` file contains:
- `PORT=5000` - Server port
- `MONGO_URI=mongodb://localhost:27017/excel_analytics` - MongoDB connection
- `JWT_SECRET=your_super_secret_jwt_key_change_this_in_production` - JWT secret

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/file/upload` - File upload
- `GET /api/file/uploads` - Get uploaded files

## Testing the API

Once the server is running, you can test with:

```bash
# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
``` 