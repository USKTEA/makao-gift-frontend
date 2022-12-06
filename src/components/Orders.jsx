import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Orders({ orders, page, changePage }) {
  const location = useLocation();

  useEffect(() => {
    const pivot = location.search
      .split('')
      .indexOf('=');

    const pageNumber = location.search
      .split('')
      .slice(pivot + 1)
      .join('');

    changePage(pageNumber);
  }, [location.search]);

  const { total, current } = page;

  return (
    <>
      <h2>내가 주문한 내역입니다</h2>
      <div>
        <ul>
          {orders.map(({ id, orderItem, deliveryInformation }) => (
            <li key={id}>
              <Link to={`/orders/${id}`}>
                <img src={orderItem.imageUrl} alt="상품이미지" />
                <p>{orderItem.manufacturer}</p>
                <p>{orderItem.description}</p>
                <p>{`To. ${deliveryInformation.recipient}`}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {Array.from({ length: total }, (_, number) => number + 1)
          .map((number) => (
            <li key={number}>
              <Link
                to={`/orders?page=${number}`}
                className="page-number"
              >
                {number}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
