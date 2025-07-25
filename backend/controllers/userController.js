const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // The 'auth' middleware attaches the user object to the request (req.user)
  const user = await User.findById(req.user._id).select('-password');
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Please provide both old and new passwords.' });
    }

    const user = await User.findById(req.user._id);

    if (user && (await user.comparePassword(oldPassword))) {
        user.password = newPassword; // The pre-save hook in User.js will hash it
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(401).json({ error: 'Invalid old password' });
    }
};

module.exports = { getUserProfile, updateUserProfile, changePassword };