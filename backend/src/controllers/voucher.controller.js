import * as voucherService from '../services/voucher.service.js';

export const getVoucherAvailable = async (req, res) => {
  try {
    const result = await voucherService.getVoucherAvailable(
      req.body.Account_ID
    );
    res.status(200).json({
      message: 'Get vouchers available',
      data: {
        order: result[0],
        product: result[1],
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
