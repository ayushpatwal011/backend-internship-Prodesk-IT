import express from 'express';
import {
  getTrendingCoins,
  getTopCoins,
  getCoinDetails,
  getCoinChart,
  getCryptoNews,
} from '../controllers/marketController.js';

const router = express.Router();

router.get('/trending', getTrendingCoins);
router.get('/top', getTopCoins);
router.get('/coin/:id', getCoinDetails);
router.get('/chart/:id', getCoinChart);
router.get('/global', getCryptoNews);

export default router;
