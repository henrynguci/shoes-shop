import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiGift } from "react-icons/fi";
import { FcShipped } from "react-icons/fc";
import { FaAddressCard } from "react-icons/fa6";
import { FcPhone } from "react-icons/fc";
const ShipFake = [
  {
    Shipper_ID: 1,
    FullName: "Shoppe",
  },
  {
    Shipper_ID: 2,
    FullName: "Tiki",
  },
  {
    Shipper_ID: 1,
    FullName: "GHTK",
  },
];

const VoucherFake = [
  {
    Voucher_ID: "",
    Name: "No Voucher",
  },
  {
    Voucher_ID: "1",
    Name: "Sale10",
  },
];

export default function Cart() {
  const [Shipfee, setShipfee] = useState(30000);
  const [VoucherID, setVoucherID] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [Shipper_ID, setShipper_ID] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCarttotal] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming the customer ID is stored in localStorage
  const customerId = localStorage.getItem("id");

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        CustomerID: customerId,
        Address: Address,
        PhoneNumber: Phone,
        VoucherID: VoucherID,
        Shipfee: Shipfee,
        Shipper_ID: Shipper_ID,
      });
      console.log(response.data); // Checkout success
      window.location.reload();
    } catch (error) {
      console.error(
        "Error during checkout:",
        error.response?.data?.message || error.message
      );
    }
  };
  const handleDeleteCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${customerId}`
      );

      console.log(response.data.message); // Log the success message
      window.location.reload();
    } catch (error) {
      console.error(
        "Error deleting cart:",
        error.response?.data?.message || error.message
      );
    }
  };

  const fetchTotal = async () => {
    axios
      .get(`http://localhost:5000/api/cart-total/${customerId}`)
      .then((response) => {
        setCarttotal(response.data);
        console.log("Cart Total:", response.data); // Use response.data to access the returned data
      })
      .catch((error) => {
        console.error("Error fetching cart total:", error);
      });
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Check if customerId exists
        if (!customerId) {
          setError("Customer ID is not available.");
          setLoading(false);
          return;
        }

        // Make the GET request to the server to fetch the cart data
        const response = await axios.get(
          `http://localhost:5000/api/cart/${customerId}`
        );

        // Set the cart data from the response
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("An error occurred while fetching the cart data.");
        setLoading(false);
      }
    };

    fetchCartData();
    fetchTotal();
  }, [customerId]); // Run when component mounts or customerId changes

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-[50px] font-bold ml-10">Your Cart:</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Product Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Color</th>
              <th className="py-2 px-4 text-left">Size</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Discount</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Voucher</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.Product_ID} className="border-b">
                <td className="py-2 px-4">
                  <img src={item.Img_url} alt={item.Name} className="h-20" />
                </td>
                <td className="py-2 px-4">{item.Name}</td>
                <td className="py-2 px-4">{item.Color}</td>
                <td className="py-2 px-4">{item.Size}</td>
                <td className="py-2 px-4">{item.Price} VND</td>
                <td className="py-2 px-4">{item.Discount}%</td>
                <td className="py-2 px-4">{item.TotalPrice} VND</td>
                <td className="py-2 px-4">{item.VoucherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cartTotal != "" && (
        <>
          <div className="flex items-center justify-between mt-4 mx-4 ">
            <div className="flex justify-end gap-32 font-medium   text-2xl ">
              <span>
                Product Price:{" "}
                {VoucherID !== ""
                  ? cartTotal.TotalPrice * 0.9 // If VoucherID is not an empty string, apply a 10% discount
                  : cartTotal.TotalPrice}{" "}
                VND
              </span>

              <span>Quantity: {cartTotal.TotalQuantity}</span>
            </div>
            <div>
              <button
                className="font-medium   text-2xl bg-red-600 p-2 rounded-md"
                onClick={handleDeleteCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 mt-2 items-center">
              <label htmlFor="voucherid" className="text-xl  text-black">
                VoucherBill:
              </label>
              <select
                name="voucherid"
                value={VoucherID}
                onChange={(e) => setVoucherID(e.target.value)}
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
            <div className="flex gap-2 mt-2 items-center">
              <label htmlFor="shipper" className="text-xl  text-black">
                Shipper:
              </label>
              <select
                name="shipper"
                value={Shipper_ID}
                onChange={(e) => setShipper_ID(e.target.value)}
                className="  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {ShipFake.length > 0 &&
                  ShipFake.map((item) => {
                    return (
                      <>
                        <option value={item.Shipper_ID} className="bg-gray-300">
                          {item.FullName}
                        </option>
                      </>
                    );
                  })}
              </select>
              <FcShipped className="text-xl" />
            </div>
            <div className="text-xl">
              <label>Shippee: </label>
              <span>{Shipfee} VND</span>
            </div>
            <div>
              <div className="flex  gap-2 items-center   ">
                <label htmlFor="address" className=" text-xl">
                  Address:
                </label>
                <input
                  required
                  type="text"
                  value={Address}
                  id="address"
                  name="address"
                  className="  border border-gray-300 rounded  "
                  placeholder="KTX khu B ......."
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressCard
                  className="text-xl
                "
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2   ">
                <label htmlFor="phone" className=" text-xl">
                  Phone:
                </label>
                <input
                  required
                  type="text"
                  value={Phone}
                  id="phone"
                  name="phone"
                  className="  border border-gray-300 rounded  "
                  placeholder="0795759610 ......."
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FcPhone className="text-xl" />
              </div>
            </div>
          </div>

          <div>
            <div
              className="flex  gap-32 font-medium   text-2xl mt-4 ml-4
             "
            >
              <span>
                Total:{" "}
                {VoucherID !== ""
                  ? cartTotal.TotalPrice * 0.9 + Shipfee // If VoucherID is not an empty string, apply a 10% discount
                  : cartTotal.TotalPrice + Shipfee}{" "}
                VND
              </span>
              <button
                onClick={handleCheckout}
                className="bg-amber-600 text-white p-4 rounded-lg"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
