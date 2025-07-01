import express from 'express';
import { compareCoins } from '../controllers/compareController.js';

const router = express.Router();

router.get('/', compareCoins);

export default router;
