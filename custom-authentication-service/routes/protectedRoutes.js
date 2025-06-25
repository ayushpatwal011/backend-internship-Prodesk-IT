// routes/protectedRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// General protected route
router.get('/user', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, Role: ${req.user.role}` });
});

// Admin-only route
router.get('/admin', protect, isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin! This is an admin-only route.' });
});

export default router
