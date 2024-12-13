import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const [orderProducts, setOrderProducts] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/order-product/${id}`)
        .then((res) => {
          setOrderProducts(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <div className="order-products">
        <h2>Order Products</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Color</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Voucher Name</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((product) => (
              <tr key={product.Product_ID}>
                <td className="border p-2">
                  <img
                    src={product.Img_url}
                    alt={product.Name}
                    className="h-20"
                  />
                </td>
                <td className="border p-2">{product.Name}</td>
                <td className="border p-2">{product.Color}</td>
                <td className="border p-2">{product.Size}</td>
                <td className="border p-2">{product.VoucherName}</td>

                <td className="border p-2">{product.Discount}%</td>
                <td className="border p-2">{product.Quantity}</td>
                <td className="border p-2">{product.Price} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
