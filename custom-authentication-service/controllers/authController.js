import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendOTP from '../utils/sendOTP.js';

export const register = async (req, res) => {
  const { name, email, password ,role} = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash ,  role: role || 'user', });
  res.json({ message: 'User registered' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpire = new Date(Date.now() + 5 * 60000);
  await user.save();

  sendOTP(email, otp); // simulate email OTP
  res.json({ message: 'OTP sent' });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpire < new Date()) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
};
