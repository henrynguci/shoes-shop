import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import CartItem from '../components/CartItem';
import emptyCart from '../public/empty-cart.jpg';
import spinner from '../public/spinner.svg';
import voucher_icon from '../public/ticket-02-stroke-rounded.svg';
import CloseIcon from '@mui/icons-material/Close';
import cartService from '../services/cart.js';
import axios from 'axios';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
  
const sendDataToBackend = async () => {
  try {
    const accountID = localStorage.getItem('accountID');  // Dữ liệu bạn muốn gửi (ví dụ: Account_ID)

    const response = await axios.post('http://localhost:5000/api/cart', {
      Account_ID: accountID,  // Truyền Account_ID trong body
    });

    console.log(response.data);  // Kiểm tra dữ liệu trả về từ backend
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu:', error);
  }
};
sendDataToBackend()
  
}, []);

  

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377;{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                <div className="flex m-[15px] justify-between items-center">
                  <div className="flex gap-2">
                    <img src={voucher_icon} alt="voucher" />
                    Shop voucher
                  </div>
                  <button
                    className="text-[#05a]"
                    onClick={() => setShowVoucher(true)}
                  >
                    Choose vouchers
                  </button>
                </div>

                {/* BUTTON START */}
                <Link to="/success">
                  <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
                    Checkout
                    {loading && <img src={spinner} />}
                  </button>
                </Link>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <img
              src={emptyCart}
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
              loading="lazy"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              to="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {showVoucher && (
          <div className="fixed top-[0] left-[0] w-full h-full bg-[rgba(0,_0,_0,_0.5)] flex justify-center items-center z-50">
            <div className="bg-[white] p-[20px] rounded-[5px] w-[500px]">
              <div className="flex justify-between items-center font-bold text-[larger] pb-[5px]">
                <h2>Choose Shop Voucher</h2>
                <button
                  className="bg-none border-[none] text-[16px] cursor-pointer"
                  onClick={() => setShowVoucher(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-[10px]">
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className={`border-[1px] border-[solid] border-[#ccc] p-[10px] mb-[10px] cursor-pointer bg-[#f9f9f9] [transition:background-color_0.3s_ease,_border-color_0.3s_ease] hover:bg-[#eee] ${
                      selectedVoucher === voucher.id
                        ? 'border-[#4caf50] bg-[#eaffea]'
                        : ''
                    }`}
                    onClick={() => setSelectedVoucher(voucher.id)}
                  >
                    <div className="voucher-title">{voucher.title}</div>
                    <div className="voucher-description">
                      {voucher.description}
                    </div>
                    <div className="voucher-condition">{voucher.condition}</div>
                  </div>
                ))}
              </div>
              <button
                className="p-[10px] bg-[orange] text-[white] border-[none] cursor-pointer ml-[350px]"
                onClick={() => setShowVoucher(false)}
              >
                ÁP DỤNG
              </button>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
