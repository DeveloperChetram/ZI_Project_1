const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/user',authController.getUser)
=======

// Test route (optional)
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

// Auth routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

>>>>>>> main
module.exports = router;
