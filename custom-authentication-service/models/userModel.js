import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
   role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', 
  },
  otp: String,
  otpExpire: Date,
});

export default mongoose.model('User', userSchema);
