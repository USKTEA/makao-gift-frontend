import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import url from '../utils/url';

const Container = styled.div`
  padding-block: 3em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 1em;
`;

const Image = styled.img`
  margin-bottom: 1em;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const List = styled.ul`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 2em;
  margin-bottom: 3em;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
`;

const Manufacturer = styled.p`
  color: #999999;
`;

const Name = styled.p`
  width: 17.5em;
  height: 2.5em;
  margin-block: 0.5em;
  line-height: 1.25em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const To = styled.strong`
  font-weight: 700;
  color: #444444;
`;

const Pages = styled.ul`
  display: flex;
  margin-left: 50%;
`;

const Page = styled.li`
  margin-right: .5em;
`;
const Current = styled.span`
 font-weight: 800;
`;

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
    <Container>
      <Title>내가 주문한 내역입니다</Title>
      <List>
        {orders.map(({ id, orderItem, deliveryInformation }) => (
          <Item key={id}>
            <Link to={`/orders/${id}`}>
              <Image
                src={url(orderItem.imageUrl)}
                alt="상품이미지"
                width={280}
                height={280}
              />
              <Manufacturer>{orderItem.manufacturer}</Manufacturer>
              <Name>{orderItem.description}</Name>
              <To>{`To. ${deliveryInformation.recipient}`}</To>
            </Link>
          </Item>
        ))}
      </List>
      <Pages>
        {Array.from({ length: total }, (_, number) => number + 1)
          .map((number) => (
            <Page key={number}>
              <Link
                to={`/orders?page=${number}`}
                className="page-number"
              >
                {current === number
                  ? <Current>{number}</Current>
                  : number}
              </Link>
            </Page>
          ))}
      </Pages>
    </Container>
  );
}
