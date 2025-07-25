const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Test route (optional)
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

// Auth routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
