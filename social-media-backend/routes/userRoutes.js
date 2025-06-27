import express from 'express';
import {
  getMyProfile,
  updateProfile,
  getUserById,
  followUser,
  unfollowUser,
  searchUsersByName
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.get('/search/:name', protect, searchUsersByName);
router.get('/:id', protect, getUserById);
router.put('/:id/follow', protect, followUser);
router.put('/:id/unfollow', protect, unfollowUser);

export default router;
