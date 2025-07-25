import Csv from '../models/csv.model.js';
import User from '../models/user.model.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get admin statistics
// @route   GET /api/v1/csv/stats
// @access  Private/Admin
export const getStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalFilesUploaded = await Csv.countDocuments();

  // New aggregation pipeline for chart types
  const chartTypeStats = await Csv.aggregate([
    {
      $group: {
        _id: '$chartType',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalFilesUploaded,
      chartTypeStats,
    },
  });
});