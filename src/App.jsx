import { Route, Routes } from 'react-router-dom';

import { Reset } from 'styled-reset';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  return (
    <>
      <Reset />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path={`/orders + ${id}`} element={<OrderDetailPage />} /> */}
      </Routes>
    </>
  );
}
