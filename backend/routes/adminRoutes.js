const express = require('express');
const router = express.Router();
const { 
  getStats, 
  getUsers, 
  addUser,
  toggleBlockUser,
  deleteUser,
  getAllUploads 
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

// All routes in this file are protected and require admin role
router.use(adminAuth);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.post('/users', addUser);
router.patch('/users/:id/toggle-block', toggleBlockUser);
router.delete('/users/:id', deleteUser);
router.get('/uploads', getAllUploads);

module.exports = router;