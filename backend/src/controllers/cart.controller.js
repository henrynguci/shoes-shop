import * as cartService from '../services/cart.service.js';

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.body.Account_ID);
    res.status(200).json({
      message: 'Get cart',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addVersionToCart = async (req, res) => {
  try {
    await cartService.addVersionToCart(req.body);
    res.status(200).json({ message: 'Add new version to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeVersionInCart = async (req, res) => {
  try {
    await cartService.removeVersionInCart(req.body);
    res.status(200).json({ message: 'Add new version to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
