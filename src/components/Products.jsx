import { Link } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/numberFormat';

export default function Products() {
  const productStore = useProductStore();

  const { products } = productStore;

  return (
    <>
      <p>인기선물을 한 자리에 모았어요</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`products/${product.id}`}>
              <div>
                <img src={product.image} alt="상품사진" />
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
          <li>
            <Link
              to="/products?page=1"
              className="page-number"
            >
              1
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
