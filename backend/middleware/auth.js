const jwt = require('jsonwebtoken');
const User = require('../models/User'); // CORRECTED PATH

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    
    if (user.isBlocked) {
      return res.status(403).json({ error: 'Your account has been blocked by an administrator.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    // We need to get the user without the isBlocked check for adminAuth first
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) throw new Error();

    req.user = user; // Attach user to request

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = { auth, adminAuth };