import { useEffect } from 'react';

import useProductStore from '../hooks/useProductStore';

import Banner from '../components/Banner';
import Products from '../components/Products';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const { products } = productStore;

  return (
    <>
      <Banner />
      {products.length === 0
        ? <p>상품이 존재하지 않습니다</p>
        : <Products />}
    </>
  );
}
