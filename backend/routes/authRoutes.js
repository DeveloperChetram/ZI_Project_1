const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken')
router.post('/login', authController.login);
router.post('/signup', authController.signup);

router.get('/user',authController.getUser)
module.exports = router;
