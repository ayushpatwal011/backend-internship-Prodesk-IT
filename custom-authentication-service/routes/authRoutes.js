import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  verifyOTP,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyOTP);

// Google OAuth2
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Google login successful');
  }
);

export default router;
