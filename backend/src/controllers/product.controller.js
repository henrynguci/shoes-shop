export const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({ message: 'Get all products' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
