import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import OrdersPage from './OrdersPage';

const context = describe;

const getOrders = jest.fn();
const getPage = jest.fn();
const fetchOrders = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  orders: [
    {
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
    },
  ],
  page: {
    current: 1,
    total: 1,
  },
  getOrders,
  getPage,
  fetchOrders,
}));

describe('OrdersPage', () => {
  context('when member logged in', () => {
    it('render member order history', async () => {
      getOrders.mockReturnValue([
        {
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
        },
      ]);

      getPage.mockReturnValue({
        total: 1,
        current: 1,
      });

      render(
        <MemoryRouter>
          <OrdersPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        screen.getByText('내가 주문한 내역입니다');
      });
    });
  });
});
