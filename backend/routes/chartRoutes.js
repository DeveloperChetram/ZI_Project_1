
const express = require('express');
const router = express.Router();
const { getChartData } = require('../controllers/chartController');

router.get('/data', getChartData);

module.exports = router;
