import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

import useProductStore from '../hooks/useProductStore';

export default function ProductDetailPage() {
  const { id } = useParams();

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(id);
  }, []);

  return (
    <ProductDetail />
  );
}
