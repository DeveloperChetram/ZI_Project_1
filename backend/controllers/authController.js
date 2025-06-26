const User = require('../User');

const login = (req, res) => {
  res.json({ message: "Login successful" });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

module.exports = { login, signup };