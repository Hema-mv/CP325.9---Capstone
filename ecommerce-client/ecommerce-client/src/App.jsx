import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ProductPage from './Pages/ProductPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import NavBar from './Components/NavBar';
import './Styles/app.css';

const App = () => {
  const [user, setUser] = useState("");
  return (
    <>
       {user ? (
          <>
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/productlist" element={<ProductDetailsPage />} />
      </Routes>
    </div>
     </>
    ) 
    : (
      <AuthPage setUser={setUser} />
    )
    }
    </>
  );
};

export default App;
