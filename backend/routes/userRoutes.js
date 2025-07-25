const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// This defines the GET /api/users/profile and PUT /api/users/profile routes
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

// This defines the PUT /api/users/change-password route
router.put('/change-password', auth, changePassword);

module.exports = router;