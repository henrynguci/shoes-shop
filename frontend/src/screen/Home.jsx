import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Home/Nav";
import home_bg from "../assets/bg-home.jpg";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${home_bg})` }}
      ></main>
      <Footer />
    </>
  );
}
