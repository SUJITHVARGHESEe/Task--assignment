const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/databaseModel')

const dotevn =require('dotenv').config()
//user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any required fields are empty
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All Input is required!' });
    } 

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login

// User login
router.post('/login', async (req, res) => {
    try {
      
        
      const { email, password } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ message: 'Must fil email and password' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id },process.env.secret );
  
      res.json({ token ,message:"login success",Username:user.username});
    
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports= router