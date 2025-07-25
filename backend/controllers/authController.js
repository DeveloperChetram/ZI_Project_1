<<<<<<< HEAD
const User = require('../models/User');
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const login =async (req, res) => {
  try {
  const { email  , pass} = req.body;
  const existUser = await User.findOne({email:email})
  if(!existUser){
    res.json({message:"user not registered"})
  } 
  console.log("userexist ",existUser);
  const newpw =await bcrypt.compare(pass, existUser.password)
  // console.log("newpw")
  if(!newpw){
    res.json("wrong password")
  }
  const token = await jwt.sign(existUser.id,"chetram@121")
// console.log("token", token)
res.cookie('authtoken', token).json({ message: "Login successful" });
  
} catch (error) {
  console.log("faild in controller while login")
}
=======
const User = require('../User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
>>>>>>> main
};

const signup = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, email, password } = req.body;
    const existUser= await User.findOne({email:email})
    if(existUser){
      res.json("user already exist")
    }  
    const hashpw= await bcrypt.hash(password,10)
    const user = new User({ name, email, password:hashpw });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Attempt to register with a duplicate email:", req.body.email);
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

const getUser = async  (req, res)=>{
  const token = req.cookies?.authtoken || req.header("Authorization")?.replace('bearer' , '');
  const newtoken = token.split(' ')[1]
  req.token = newtoken
  const userid = jwt.verify(newtoken,"chetram@121")
  console.log(userid)
  const user =  await User.findById(userid)
  req.user = user
  // console.log(user)
  res.json(user)
}

module.exports = { login, signup , getUser};
=======
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { login, signup };
>>>>>>> main
