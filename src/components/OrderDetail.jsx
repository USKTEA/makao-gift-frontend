import { Link } from 'react-router-dom';

import numberFormat from '../utils/numberFormat';
import dateFormat from '../utils/dateFormat';

export default function OrderDetail({ order }) {
  const {
    orderItem, quantity, cost, createdAt, deliveryInformation,
  } = order;

  return (
    <>
      <div>
        <Link to={`/products/${orderItem.id}`}>
          <img src={orderItem.imageUrl} alt="상품이미지" />
        </Link>
      </div>
      <div>
        <span>{orderItem.manufacturer}</span>
        <span>{orderItem.name}</span>
      </div>
      <table>
        <tbody>
          <tr>
            <td>구매수량</td>
            <td>{quantity}</td>
          </tr>
          <tr>
            <td>총 상품금액</td>
            <td>{`${numberFormat(cost)}원`}</td>
          </tr>
          <tr>
            <td>구매일</td>
            <td>{`${dateFormat(createdAt)}`}</td>
          </tr>
          <tr>
            <td>받는 분</td>
            <td>{deliveryInformation.recipient}</td>
          </tr>
          <tr>
            <td>받는 분 주소</td>
            <td>{deliveryInformation.address}</td>
          </tr>
          <tr>
            <td>받는 분께 보내는 메세지</td>
            <td>{deliveryInformation.message}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
