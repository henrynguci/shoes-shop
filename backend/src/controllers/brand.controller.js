import * as brandService from '../services/brand.service.js';

export const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    res.status(200).json({ message: 'Get brands', data: brands });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
