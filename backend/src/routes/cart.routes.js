import express from 'express';
import {
  addVersionToCart,
  getCart,
  removeVersionInCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/cart', getCart);
router.post('/cart', addVersionToCart);
router.delete('/cart', removeVersionInCart);

export default router;
