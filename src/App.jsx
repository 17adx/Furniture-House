import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Login from './pages/Login';
import { CartProvider } from './components/CartContext/CartContext';
import SingleProduct from './components/SingleProduct/SingleProduct'; 
import 'normalize.css'
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<SingleProduct />} /> 
      </Routes>
    </CartProvider>
  );
};

export default App;