const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// All routes here are protected
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;