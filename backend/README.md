# Backend API - Excel Analytics

A Node.js/Express backend with MongoDB for Excel file upload and analysis.

## 🚀 Quick Start

### Prerequisites
1. **Node.js** - Download from [nodejs.org](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local MongoDB: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas: Free cloud database at [mongodb.com/atlas](https://www.mongodb.com/atlas)

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - The `.env` file is already created with default values
   - For MongoDB Atlas, update `MONGO_URI` in `.env`

3. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Windows
   net start MongoDB
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```
   
   Or use the batch file:
   ```bash
   start.bat
   ```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### File Operations (Protected Routes)
- `POST /api/file/upload` - Upload Excel file
- `GET /api/file/history` - Get upload history

## 🔧 Configuration

### Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/excel_analytics
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### MongoDB Atlas Setup
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Get connection string
4. Update `MONGO_URI` in `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/excel_analytics
   ```

## 🧪 Testing

### Manual Testing
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

### Automated Testing
```bash
node test-api.js
```

## 📁 Project Structure

```
backend/
├── controllers/          # Route controllers
│   ├── authController.js # Authentication logic
│   └── fileController.js # File upload/processing
├── middleware/           # Custom middleware
│   └── auth.js          # JWT authentication
├── models/              # MongoDB models
│   └── Upload.js        # File upload model
├── routes/              # API routes
│   ├── authRoutes.js    # Auth endpoints
│   └── fileRoutes.js    # File endpoints
├── uploads/             # Temporary file storage
├── User.js              # User model
├── server.js            # Main server file
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **Protected Routes** - File operations require authentication
- **Input Validation** - Basic validation for user inputs
- **Error Handling** - Comprehensive error responses

## 🛠️ Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload handling
- **exceljs** - Excel file processing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚨 Troubleshooting

### Common Issues

1. **"npm not recognized"**
   - Install Node.js from [nodejs.org](https://nodejs.org/)

2. **MongoDB connection failed**
   - Ensure MongoDB is running locally
   - Or use MongoDB Atlas with correct connection string

3. **Port already in use**
   - Change PORT in `.env` file
   - Or kill process using port 5000

4. **JWT errors**
   - Ensure JWT_SECRET is set in `.env`

### Getting Help
- Check the console for error messages
- Verify all environment variables are set
- Ensure MongoDB is accessible
- Check network connectivity for Atlas

## 📝 License

This project is part of the Excel Analytics application. 