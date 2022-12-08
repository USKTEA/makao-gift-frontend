import styled from 'styled-components';

import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import { apiService } from './services/ApiService';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

import GlobalStyle from './styles/GlobalStyle';
import useMemberStore from './hooks/useMemberStore';

const Main = styled.main`
  padding-block: 1em;
`;

export default function App() {
  const memberStore = useMemberStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      memberStore.fetchMember();
    }
  }, []);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-success" element={<SignUpSuccessPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Routes>
      </Main>
    </>
  );
}
