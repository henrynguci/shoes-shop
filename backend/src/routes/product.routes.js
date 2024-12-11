import express from 'express';
import {
  deleteProduct,
  getAllProducts,
  getProductDetail,
  insertProduct,
  updateProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductDetail);

router.post('/products', insertProduct);
router.post('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

export default router;
