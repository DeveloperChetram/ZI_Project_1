# 🚀 MongoDB Atlas Setup (Cloud Database)

Since local MongoDB is not running, let's use MongoDB Atlas (free cloud database).

## Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free" or "Sign Up"
3. Create an account (free)

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## Step 5: Get Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Your .env File

Replace the MONGO_URI in your `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/excel_analytics
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Replace:**
- `yourusername` with your Atlas username
- `yourpassword` with your Atlas password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL

## Step 7: Test the Connection

Run your backend again:
```bash
cd backend
npm run dev
```

You should see: "✅ MongoDB connected"

---

## Alternative: Quick Atlas Setup Script

I can create a script to help you set up Atlas automatically. Would you like me to do that? 