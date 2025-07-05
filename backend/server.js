const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send('Backend is working! 🚀');
});

// Database connection and server start
const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Changed to MONGO_URI
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    app.listen(PORT, () => {
      console.log(`⚠️ Server running WITHOUT MongoDB on http://localhost:${PORT}`);
    });
  }
};

startServer();