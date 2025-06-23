import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { createChat, sendMessage, getMessages } from '../controllers/chatController.js';
import {upload} from "../multer.js"
router.post('/chat', protect, createChat);
router.post('/message', protect, upload.single('file'), sendMessage);
router.get('/messages/:chatId', protect, getMessages);

export default router;
