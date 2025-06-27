// routes/postRoutes.js
import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  toggleSavePost,
  getMySavedPosts,
  getPostStats
} from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';

const upload = multer({ storage });
const router = express.Router();

router.post('/', protect, upload.single('image'), createPost);
router.get('/', protect, getAllPosts);
router.get('/saved/me', protect, getMySavedPosts);
router.get('/:id', protect, getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, toggleLike);
router.put('/:id/save', protect, toggleSavePost);
router.get('/:id/stats', protect, getPostStats);

export default router
