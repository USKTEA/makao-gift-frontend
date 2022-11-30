import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

import useProductStore from '../hooks/useProductStore';

export default function ProductDetailPage() {
  const location = useLocation();
  const { pathname } = location;

  const id = pathname.slice(pathname.lastIndexOf('/') + 1);

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(id);
  }, []);

  return (
    <ProductDetail />
  );
}
