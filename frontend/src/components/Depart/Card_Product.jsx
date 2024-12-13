import React, { useState } from "react";
import iconCart from "../../assets/iconCart.png";
import iconSale from "../../assets/sale.png";
import { Link } from "react-router-dom";
import { FiGift } from "react-icons/fi";
import axios from "axios";
import { showSucess } from "../Alert/Alert";

const VoucherFake = [
  {
    Voucher_ID: "",
    Name: "No Voucher",
  },
  {
    Voucher_ID: "1",
    Name: "Sale10",
  },
  {
    Voucher_ID: "2",
    Name: "Sale20",
  },
];

export default function Card_Product(props) {
  const [voucher, setVocuher] = useState("");
  const { Product_ID, Color, Size, Price, Amount, Name, Img_url } = props.data;

  const handleAddToCart = async () => {
    try {
      //Adding to cart via axios POST request
      const response = await axios.post(
        "http://localhost:5000/api/add-to-cart",
        {
          CustomerID: localStorage.getItem("id"), // Replace with actual customer ID
          ProductID: Product_ID,
          Color: Color,
          Size: Size,
          Amount: 1,
          VoucherID: voucher,
        }
      );

      window.location.reload();

      // You can add success handling here if needed, like updating UI or giving feedback
      console.log(response.data); // Success
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-sm relative ">
        <div className="flex flex-row">
          <img
            src={Img_url}
            alt=""
            className="w-full h-40 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
          />
        </div>

        <h3 className="text-2xl pt-3 text-center font-medium line-clamp-1 hover:line-clamp-none">
          {Name}
        </h3>
        <div className="text-2xl flex justify-between font-througt">
          <span>Color: {Color}</span>
          <span>Size: {Size}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <p>
            <span className="text-2xl font-medium">{Price} VND</span>
          </p>
          <button
            className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
            onClick={handleAddToCart}
          >
            <img src={iconCart} alt="" className="w-5" />
            Add To Cart
          </button>
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <label htmlFor="voucherid" className="text-xl  text-black">
            Voucher:
          </label>
          <select
            name="voucherid"
            value={voucher}
            onChange={(e) => setVocuher(e.target.value)}
            className="  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {VoucherFake.length > 0 &&
              VoucherFake.map((item) => {
                return (
                  <>
                    <option value={item.Voucher_ID} className="bg-gray-300">
                      {item.Name}
                    </option>
                  </>
                );
              })}
          </select>
          <FiGift className="text-xl" />
        </div>
      </div>
    </>
  );
}
