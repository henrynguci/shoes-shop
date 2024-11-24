import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from './pages/shop.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<Shop />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
