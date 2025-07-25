const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getHistory } = require('../controllers/fileController');
const { auth } = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/history', auth, getHistory);

module.exports = router;
