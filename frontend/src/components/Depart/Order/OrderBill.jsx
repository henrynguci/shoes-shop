import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineFindInPage } from "react-icons/md";

export default function OrderBill() {
  const [order, setOrder] = useState([]);
  const customerId = localStorage.getItem("id");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${customerId}`
      );
      console.log(response.data); // Log the orders data
      setOrder(response.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">Order Bill</h1>

        {order.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">CreateTime</th>
                <th className="border px-4 py-2 text-left">
                  Order PhoneNumber
                </th>
                <th className="border px-4 py-2 text-left">Ship Fee</th>
                <th className="border px-4 py-2 text-left">Voucher</th>
                <th className="border px-4 py-2 text-left">Ship</th>
                <th className="border px-4 py-2 text-left">Ship Number</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Total Price</th>
                <th className="border px-4 py-2 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item.Order_ID} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.Create_time} </td>
                  <td className="border px-4 py-2">{item.PhoneNumber} </td>
                  <td className="border px-4 py-2">{item.Shipfee} VND</td>
                  <td className="border px-4 py-2">{item.PromotionName}</td>
                  <td className="border px-4 py-2">{item.Fullname}</td>
                  <td className="border px-4 py-2">{item.ShipNumber}</td>
                  <td className="border px-4 py-2">{item.Address}</td>
                  <td className="border px-4 py-2">{item.Status}</td>
                  <td className="border px-4 py-2">{item.Price} VND</td>
                  <td className="border px-4 py-2">
                    <Link to={`${item.Order_ID}`}>
                      <MdOutlineFindInPage className="text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-xl text-gray-600">No orders found.</p>
        )}
      </div>
    </>
  );
}
