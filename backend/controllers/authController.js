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
};

const signup = async (req, res) => {
  try {
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