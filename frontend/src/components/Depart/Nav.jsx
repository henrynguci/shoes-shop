import React, { useEffect, useState } from "react";
import Logout from "../../screen/Logout";
import { Link, NavLink } from "react-router-dom";
import iconCart from "../../assets/iconCart.png";
import { FiUser } from "react-icons/fi";
import axios from "axios";

export default function Nav() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const customerID = localStorage.getItem("id");

  const fetchTotal = async () => {
    axios
      .get(`http://localhost:5000/api/cart-total/${customerID}`)
      .then((response) => {
        setTotalQuantity(response.data.TotalQuantity);
        console.log("Cart Total:", response.data); // Use response.data to access the returned data
      })
      .catch((error) => {
        console.error("Error fetching cart total:", error);
      });
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <>
      <nav className=" border-gray-200 bg-gray-900 ">
        <div className="flex items-center flex-wrap  justify-between max-w-screen-xl mx-auto p-4">
          <a
            href="/user"
            className="flex items-center  space-x-3 rtl:space-x-reverse"
          >
            <div className="text-2xl text-white flex items-center justify-center">
              <FiUser />
            </div>

            <span className="text-white text-2xl font-througt">
              {localStorage.getItem("username").toUpperCase()}
            </span>
          </a>

          <div className=" flex gap-10 items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <Link to={"cart"}>
              <div className=" cursor-pointer w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative">
                <img src={iconCart} alt="" className="w-6" />
                <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                  {totalQuantity}
                </span>
              </div>
            </Link>

            <div>
              <Logout />
            </div>
          </div>

          <div
            className=" items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="gap-20 flex flex-col text-2xl font-robot p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="order"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  OrderHistory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive ? "text-red-800 underline" : "text-blue-500"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
