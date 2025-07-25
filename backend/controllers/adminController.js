const User = require('../User');
const Upload = require('../models/Upload');

// Get statistics for the admin dashboard
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUploads = await Upload.countDocuments();

    // Example of a more complex aggregation
    const mostUsedChartTypes = await Upload.aggregate([
      { $group: { _id: '$chartType', count: { $sum: 1 } } }, // Assuming you add chartType to Upload model
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.status(200).json({
      totalUsers,
      totalUploads,
      mostUsedChartTypes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Also delete their uploads
    await Upload.deleteMany({ user: req.params.id });
    res.status(200).json({ message: 'User and their data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};