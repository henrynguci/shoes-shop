import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from './cart.jsx';
import Home from './Home.jsx';
import ProductDetail from './productDetail.jsx';
import Login from './Login.jsx';
import Success from './success.jsx';
import Fail from './failed.jsx';

const Shop = () => {

  return ( 
    <>
      <Header />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/product/*" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>       
    </>

  );
};

export default Shop;