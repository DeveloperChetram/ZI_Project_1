const login = (req, res) => {
  res.json({ message: "Login successful" });
};

const signup = (req, res) => {
  res.json({ message: "Signup successful" });
};

module.exports = { login, signup };