import express from 'express';
import { getBrands } from '../controllers/brand.controller.js';

const router = express.Router();

router.get('/brand', getBrands);

export default router;
