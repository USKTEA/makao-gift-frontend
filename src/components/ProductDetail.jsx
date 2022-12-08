/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useMemberStore from '../hooks/useMemberStore';
import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';

import numberFormat from '../utils/numberFormat';

export default function ProductDetail() {
  const [, setSpecification] = useLocalStorage('specification', '');
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const productStore = useProductStore();
  const memberStore = useMemberStore();
  const orderSpecificationStore = useOrderSpecificationStore();

  const { selected } = productStore;

  useEffect(() => {
    orderSpecificationStore.createSpecification(
      { buyer: memberStore.memberName(), selected },
    );
  }, [selected]);

  const handleClickOrder = () => {
    if (!memberStore.isLoggedIn()) {
      navigate('/login');

      return;
    }

    if (!memberStore.canAfford(orderSpecificationStore.cost())) {
      setClicked(true);

      return;
    }

    setSpecification(orderSpecificationStore.getSpecification());

    navigate('/order');
  };

  return (
    <div>
      <img src={selected.imageUrl} alt="상품이미지" />
      <p>{selected.name}</p>
      <p>
        {`${numberFormat(selected.price)}원`}
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
            <td><label htmlFor="quantity">구매수량</label></td>
            <td>
              <div>
                <button
                  type="button"
                  onClick={() => orderSpecificationStore.decreaseQuantity()}
                >
                  -
                </button>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={orderSpecificationStore.quantity() || 0}
                  onChange={(e) => (
                    orderSpecificationStore.modifyQuantity(
                      Number(e.target.value),
                    )
                  )}
                />
                <button
                  type="button"
                  onClick={() => orderSpecificationStore.increaseQuantity()}
                >
                  +
                </button>
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
          <strong>
            {`${numberFormat(orderSpecificationStore.cost())}원`}
          </strong>
        </span>
      </div>
      <div>
        <button type="button" onClick={handleClickOrder}>
          선물하기
        </button>
      </div>
      {clicked && !memberStore.canAfford(orderSpecificationStore.cost())
        ? <p>❌잔액이 부족하여 선물하기가 불가합니다❌</p>
        : null}
    </div>

  );
}
