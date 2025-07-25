import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { uploadCsv, getHistory } from '../controllers/csv.controller.js';
import { getStats } from '../controllers/stat.controller.js'; // Import the new controller

const router = express.Router();

// ... other routes
router.route('/stats').get(protect, admin, getStats); // Make sure it points to getStats

export default router;