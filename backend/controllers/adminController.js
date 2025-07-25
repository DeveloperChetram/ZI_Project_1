const User = require('../models/User');
const Upload = require('../models/Upload');

// Get statistics for the admin dashboard
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUploads = await Upload.countDocuments();
    res.status(200).json({ totalUsers, totalUploads });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Add a new user (admin only)
exports.addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

// Block/Unblock a user
exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({ message: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Upload.deleteMany({ user: req.params.id });
    res.status(200).json({ message: 'User and their uploads deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Get all uploads from all users
exports.getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().populate('user', 'username email').sort({ uploadedAt: -1 });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
};

// Reset a user's password
exports.resetUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password = password; // The pre-save hook in the User model will hash it
    await user.save();
    res.status(200).json({ message: "User's password has been reset" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// Get all uploads from a specific user
exports.getUserUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.params.id }).populate('user', 'username email').sort({ uploadedAt: -1 });
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user uploads' });
  }
};