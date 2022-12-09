import { Link } from 'react-router-dom';

import styled from 'styled-components';

import numberFormat from '../utils/numberFormat';
import dateFormat from '../utils/dateFormat';
import url from '../utils/url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3em;
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 4em;
  left: 0;
  width: 100vw;
  height: 18em;
  background: #FFF5BD;
  z-index: -1;
`;

const Image = styled.img`
  margin-bottom: 1em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const Manufacturer = styled.p`
  font-size: 1.25em;
  color: #999999;
`;

const Name = styled.strong`
  font-size: 1.5em;
  font-weight: 700;
  width: 50em;
  height: 2.5em;
  margin-block: 0.5em;
  line-height: 1.25em;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Table = styled.table`
  width: 50em;
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
      width: 10em;
    }

    th:nth-child(2), td:nth-child(2) {
      width: calc(100% - 6em);
      text-align: right;
      color: #666666;
    }
  }
`;

export default function OrderDetail({ order }) {
  const {
    orderItem, quantity, cost, createdAt, deliveryInformation,
  } = order;

  return (
    <Container>
      <Background />
      <div>
        <Link to={`/products/${orderItem.id}`}>
          <Image
            src={url(orderItem.imageUrl)}
            alt="상품이미지"
            width={300}
            height={300}
          />
        </Link>
      </div>
      <Manufacturer>{orderItem.manufacturer}</Manufacturer>
      <Name>{orderItem.name}</Name>
      <Table>
        <tbody>
          <tr>
            <th>구매수량</th>
            <td>{quantity}</td>
          </tr>
          <tr>
            <th>총 상품금액</th>
            <td>{`${numberFormat(cost)}원`}</td>
          </tr>
          <tr>
            <th>구매일</th>
            <td>{`${dateFormat(createdAt)}`}</td>
          </tr>
          <tr>
            <th>받는 분</th>
            <td>{deliveryInformation.recipient}</td>
          </tr>
          <tr>
            <th>받는 분 주소</th>
            <td>{deliveryInformation.address}</td>
          </tr>
          <tr>
            <th>받는 분께 보내는 메세지</th>
            <td>{deliveryInformation.message}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
