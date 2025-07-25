const express = require('express');
const router = express.Router();
const { getStats, getUsers, deleteUser } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth'); // We'll use the adminAuth middleware

// All routes in this file are protected and require admin role
router.use(adminAuth);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;