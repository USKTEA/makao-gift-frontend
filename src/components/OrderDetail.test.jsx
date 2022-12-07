import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import OrderDetail from './OrderDetail';

describe('OrderDetail', () => {
  it('show selected order information', () => {
    const selected = {
      id: 1,
      orderItem: {
        id: 1,
        name: '초콜릿',
        manufacturer: 'Jocker',
        price: 1000,
        description: 'yammy chocolate',
        imageUrl: '1',
      },
      quantity: 6,
      cost: 6000,
      createdAt: '2022-12-05T20:52:16.213867',
      deliveryInformation: {
        recipient: 'faker',
        address: '서울시 성동구 상원동',
        message: '중꺾맘',
      },
    };

    render(
      <MemoryRouter>
        <OrderDetail order={selected} />
      </MemoryRouter>,
    );

    screen.getByAltText('상품이미지');
    screen.getByText('구매수량');
    screen.getByText('2022-12-05');
    screen.getByText('faker');
    screen.getByText('서울시 성동구 상원동');
  });
});
