import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

const Banner = styled.div`
  height: 8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const { products } = productStore;

  return (
    <>
      <Banner>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <h2>
          작정하고 준비한
          <br />
          마카오톡 선물하기 아이템
        </h2>
        <p>마카오 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </Banner>
      {products.length === 0
        ? <p>상품이 존재하지 않습니다</p>
        : (
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
        )}

    </>
  );
}
