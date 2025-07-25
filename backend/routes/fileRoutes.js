const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, getHistory } = require('../controllers/fileController');
<<<<<<< HEAD

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/history', getHistory);
=======
const { auth } = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/history', auth, getHistory);
>>>>>>> main

module.exports = router;
