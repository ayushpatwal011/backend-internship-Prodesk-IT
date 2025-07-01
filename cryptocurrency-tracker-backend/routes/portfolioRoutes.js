import express from 'express';
import {
  addToPortfolio,
  getPortfolio,
  deleteFromPortfolio,
} from '../controllers/portfolioController.js';
import { protect } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.post('/', protect, addToPortfolio);
router.get('/', protect, getPortfolio);
router.delete('/:id', protect, deleteFromPortfolio);

export default router;
