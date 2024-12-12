import * as orderService from '../services/order.service.js';

export const checkout = async (req, res) => {
  try {
    await orderService.checkout(
      req.body.Account_ID,
      req.body.orderInfo,
      req.body.orderProducts
    );
    res.status(200).json({ message: 'Checkout successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};