const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};
