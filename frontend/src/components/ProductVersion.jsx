import React, { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cartService from '../services/cart'

const ProductVersion = ({ version }) => {
  const [quantity, setQuantity] = useState(0);

  // Handle increase and decrease of quantity
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

 const handleAddToCart = async () => {
  if (quantity > 0) {
    try {
      // Retrieve accountID from localStorage
      const accountID = localStorage.getItem('accountID');
      
      // Check if accountID exists
      if (!accountID) {
        console.error("No Account ID found in localStorage.");
        return;
      }

      // Call the add function from cartService
      const res = await cartService.add(
        accountID,
        version?.Product_ID,
        version?.Color,
        version?.Size,
        quantity,
        version?.Price
      );
      console.log(res);  // Log the response to see if it was successful
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  } else {
    console.log("Please select a quantity greater than 0.");
  }
};


  return (
    <div className="border rounded-lg p-4">
      <div className="text-lg font-medium mb-2">
        Size: {version?.Size} | Color: {version?.Color}
      </div>
      <div className="flex items-center mb-2">
        <p className="mr-2 text-lg font-semibold">&#8377;{version?.Price}</p>
        <span className="text-sm text-gray-500">Amount: {version?.Amount}</span>
      </div>
      <div className="flex items-center">
        <button
          className="bg-[#007bff] text-[white] border-[none] p-[10px] text-[20px] cursor-pointer [transition:background-color_0.3s] rounded-[5px] hover:bg-[#0056b3]"
          onClick={handleDecrease}
        >
          -
        </button>
        <span className="mx-[20px] my-[0] text-[24px] text-[#333]">{quantity}</span>
        <button
          className="bg-[#007bff] text-[white] border-[none] p-[10px] text-[20px] cursor-pointer [transition:background-color_0.3s] rounded-[5px] hover:bg-[#0056b3]"
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          className="ml-[20px] flex items-center"
          onClick={handleAddToCart}
        >
          <AddShoppingCartIcon className="ml-[10px]" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductVersion;
