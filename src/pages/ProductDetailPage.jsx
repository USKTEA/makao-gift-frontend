import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/numberFormat';

export default function ProductDetailPage() {
  const location = useLocation();
  const { pathname } = location;

  const id = pathname.slice(pathname.lastIndexOf('/') + 1);

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(id);
  }, []);

  const { selected } = productStore;

  return (
    <div>
      <img src="" alt="상품이미지" />
      <p>{selected.name}</p>
      <p>
        {
          `${numberFormat(selected.price)}원`
        }
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              제조사
            </td>
            <td>
              {selected.manufacturer}
            </td>
          </tr>
          <tr>
            <td>구매수량</td>
            <td>
              <div>
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>상품설명</td>
            <td>{selected.description}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <span>
          총 상품금액:
          {' '}
          <strong>10,000원</strong>
        </span>
      </div>
      <div>
        <button type="button">선물하기</button>
      </div>
    </div>
  );
}
