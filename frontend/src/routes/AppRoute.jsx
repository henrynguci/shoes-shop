import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screen/Home";
import Login from "../screen/Login";
import Home_De from "../components/Depart/Home_Depart";
import User from "../screen/User";
import Cart from "../components/Depart/Cart/Cart";
import OrderBill from "../components/Depart/Order/OrderBill";
import Profile from "../components/Depart/Profile";
import Detail from "../components/Depart/Order/OrderDetail";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />}>
        <Route index element={<Home_De />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<OrderBill />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
}
