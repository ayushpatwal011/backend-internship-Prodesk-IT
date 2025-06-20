import express from 'express';
import { getMetrics, addMetric } from '../controllers/metricController.js';

const router = express.Router();
router.get('/', getMetrics);
router.post('/', addMetric);

export default router;
