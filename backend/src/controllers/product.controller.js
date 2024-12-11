import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      message: 'Get all products',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const result = await productService.getProductDetail(req.params.id);
    res.status(200).json({
      message: 'Get infomation of product',
      data: {
        product: result[0],
        version: result[1],
        img: result[2],
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const insertProduct = async (req, res) => {
  try {
    await productService.insertProduct(req.body.Product, req.body.Version);
    res.status(200).json({ message: 'Insert new product successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: 'Update product successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
