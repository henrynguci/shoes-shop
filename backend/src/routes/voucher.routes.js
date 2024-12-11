import express from 'express';
import { getVoucherAvailable } from '../controllers/voucher.controller.js';

const router = express.Router();

router.get('/voucher', getVoucherAvailable);

export default router;
