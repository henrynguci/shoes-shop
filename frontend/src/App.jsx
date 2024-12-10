import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from './pages/shop.jsx';
import Admin from './Admin/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<Shop />}></Route>
          <Route path={"/admin/*"} element={<Admin />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
