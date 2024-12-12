import express from 'express';
import { getBrands } from '../controllers/brand.controller';

const router = express.Router();

router.get('/brand', getBrands);

export default router;
