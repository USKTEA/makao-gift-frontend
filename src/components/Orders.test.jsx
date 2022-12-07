import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Orders from './Orders';

const context = describe;

describe('Orders', () => {
  context('when member ordered before', () => {
    it('do have order history to show', async () => {
      const orders = [
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
      ];

      const page = {
        total: 1,
        current: 1,
      };

      const handleChangePage = jest.fn();

      render(
        <MemoryRouter>
          <Orders orders={orders} page={page} changePage={handleChangePage} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('내가 주문한 내역입니다'));
        expect(screen.getAllByAltText('상품이미지').length).toBe(1);
      });
    });
  });
});
