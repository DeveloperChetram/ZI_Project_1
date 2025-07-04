const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getHistory } = require('../controllers/fileController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/history', getHistory);

module.exports = router;
