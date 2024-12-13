import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from './cart.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Success from './success.jsx';
import Fail from './failed.jsx';
import VerList from './product-ver-list.jsx';

const Shop = () => {

  return ( 
    <>
      <Header />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<VerList />} />
      </Routes>
      <Footer/>       
    </>

  );
};

export default Shop;