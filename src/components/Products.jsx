import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/numberFormat';

export default function Products() {
  const location = useLocation();

  const productStore = useProductStore();

  const { products, page } = productStore;

  const { total, current } = page;

  useEffect(() => {
    const pivot = location.search.split('').indexOf('=');

    const pageNumber = location.search.split('').slice(pivot + 1).join('');

    productStore.fetchProducts(pageNumber);
  }, [location.search]);

  return (
    <>
      <p>인기선물을 한 자리에 모았어요</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`${product.id}`}>
              <div>
                <img src={product.imageUrl} alt="상품사진" />
              </div>
              <span>{product.manufacturer}</span>
              <p>{product.name}</p>
              <span>
                {
                  `${numberFormat(product.price)}원`
                }
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        <ul>
          {Array.from({ length: total }, (_, number) => number + 1)
            .map((number) => (
              <li key={number}>
                <Link
                  to={`/products?page=${number}`}
                  className="page-number"
                >
                  {number}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
