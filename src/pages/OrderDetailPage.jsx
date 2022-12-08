import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useMemberStore from '../hooks/useMemberStore';
import useOrderStore from '../hooks/useOrderStore';

import OrderDetail from '../components/OrderDetail';

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const orderStore = useOrderStore();
  const memberStore = useMemberStore();

  useEffect(() => {
    if (!memberStore.isLoggedIn()) {
      navigate('/login');

      return;
    }

    orderStore.fetchOrder(id);
  }, []);

  const { selected } = orderStore;

  if (!selected) {
    return (<p>now loading...</p>);
  }

  return (<OrderDetail order={selected} />);
}
