/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useProductStore from '../hooks/useProductStore';
import useMemberStore from '../hooks/useMemberStore';
import useOrderSpecificationStore from '../hooks/useOrderSpecificationStore';

import numberFormat from '../utils/numberFormat';
import FormButton from './ui/FormButton';
import imageUrl from '../utils/url';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2em;
  min-width: 1024px;
  height: 100%;
  min-height: 50em;
  padding-block: 5em;
`;

const Wrapper = styled.div`
  width: 31.25em;
`;

const Title = styled.h1`
  font-size: 1.875em;
  font-weight: 500;
  width: 100%;
  margin-bottom: 0.75em;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Image = styled.img`
  margin-bottom: 1em;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const Price = styled.strong`
  font-size: 2.5em;
  font-weight: 700;
  margin-block: 0.75em;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2em;
  border-block: 1px solid #D8D8D8;

  th, td {
    text-align: left;
    vertical-align: middle;
  }
  th {
    font-weight: 500;
    color: #666666;
  }
  td {
    font-weight: 1.25em;
    color: #444444;
  }
  tr {
    border-block: 1px solid #D8D8D8;
    height: 5em;
    th:first-child, td:first-child {
      width: 6em;
    }
    th:nth-child(2), td:nth-child(2) {
      width: calc(100% - 6em);
    }
  }
`;

const ReduceButton = styled.button`
  width: 2em;
  height: 2em;
  margin-left: 0.5em;
  border: none;
  background: url(/assets/images/minus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;
  :disabled {
    background: url(/assets/images/minus-gray.png) no-repeat 100% 100%;
    background-size: contain;
    cursor: default;
  }
`;

const AddButton = styled.button`
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border: none;
  background: url(/assets/images/plus-black.png) no-repeat 100% 100%;
  background-size: contain;
  text-indent: -10em;
  overflow: hidden;
  cursor: pointer;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1em;
`;

const Message = styled.p`
  font-weight: 500;
  display: inline;
`;

const Error = styled.p`
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  color: #FF424D;
`;

const Quantity = styled.input`
  height: 3em;
  width: 4em;
  font-size: 1em;
`;

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
    <Container>
      <Image
        src={imageUrl(selected.imageUrl)}
        alt="상품이미지"
        width={600}
        height={600}
      />
      <Wrapper>
        <Title>{selected.name}</Title>
        <Price>
          {`${numberFormat(selected.price)}원`}
        </Price>
        <Table>
          <tbody>
            <tr>
              <th>
                제조사
              </th>
              <td>
                {selected.manufacturer}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="quantity">구매수량</label>
              </td>
              <td>
                <div>
                  <ReduceButton
                    type="button"
                    name="-"
                    onClick={() => orderSpecificationStore.decreaseQuantity()}
                  >
                    -
                  </ReduceButton>
                  <Quantity
                    id="quantity"
                    name="quantity"
                    type="number"
                    dir="rtl"
                    value={orderSpecificationStore.quantity() || 0}
                    onChange={(e) => (
                      orderSpecificationStore.modifyQuantity(
                        Number(e.target.value),
                      )
                    )}
                  />
                  <AddButton
                    type="button"
                    onClick={() => orderSpecificationStore.increaseQuantity()}
                  >
                    +
                  </AddButton>
                </div>
              </td>
            </tr>
            <tr>
              <th>상품설명</th>
              <td>{selected.description}</td>
            </tr>
          </tbody>
        </Table>
        <TotalPrice>
          <Message>총 상품금액:</Message>
          <Price>
            {`${numberFormat(orderSpecificationStore.cost())}원`}
          </Price>
        </TotalPrice>

        <FormButton type="button" onClick={handleClickOrder} name="send-gift">
          선물하기
        </FormButton>
        {clicked && !memberStore.canAfford(orderSpecificationStore.cost())
          ? <Error>❌잔액이 부족하여 선물하기가 불가합니다❌</Error>
          : null}
      </Wrapper>
    </Container>

  );
}
