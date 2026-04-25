const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock OTP flow
// 1. Generate OTP
router.post('/login', async (req, res) => {
  const { emailOrMobile } = req.body;
  
  if (!emailOrMobile) {
    return res.status(400).json({ message: 'Email or Mobile is required' });
  }

  // In a real app, send OTP via SMS/Email
  // For assignment, just pretend it's sent and valid OTP is 123456
  res.json({ message: 'OTP sent successfully', mockOtp: '123456' });
});

// 2. Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { emailOrMobile, otp } = req.body;

  if (otp !== '123456') {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  try {
    let user = await User.findOne({ emailOrMobile });
    if (!user) {
      user = new User({ emailOrMobile });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
