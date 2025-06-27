import express from 'express';
import {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:postId', protect, createComment);
router.get('/:postId', protect, getCommentsForPost);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;
