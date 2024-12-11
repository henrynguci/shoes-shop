import express from 'express';
import { checkout } from '../controllers/order.controller';

const router = express.Router();

router.post('/checkout', checkout);

export default router;
