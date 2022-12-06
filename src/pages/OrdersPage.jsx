import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { apiService } from '../services/ApiService';

import useMemberStore from '../hooks/useMemberStore';
import useOrderStore from '../hooks/useOrderStore';

import Orders from '../components/Orders';

export default function OrdersPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const orderStore = useOrderStore();
  const memberStore = useMemberStore();

  const orders = orderStore.getOrders();
  const page = orderStore.getPage();

  apiService.setAccessToken(accessToken);

  useEffect(() => {
    if (!memberStore.isLoggedIn() && !accessToken) {
      navigate('/login');

      return;
    }

    memberStore.fetchMember();
    orderStore.fetchOrders();
  }, []);

  const handleChangePage = async (pageNumber) => {
    await orderStore.fetchOrders(pageNumber);
  };

  if (memberStore.isLoggedIn() && !orders.length) {
    return (<p>내가 주문한 내역이 없습니다</p>);
  }

  return (
    <Orders
      orders={orders}
      page={page}
      changePage={handleChangePage}
    />
  );
}
