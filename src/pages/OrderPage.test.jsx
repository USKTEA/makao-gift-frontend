import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router';

import OrderPage from './OrderPage';

import defaultTheme from '../styles/defaultTheme';

jest.mock('../hooks/useOrderSpecificationStore', () => () => ({
  orderSpecification: {
    buyer: 'buyer',
    product: {
      id: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 10000,
      description: 'yammy chocolate',
      imageUrl: 1,
    },
    quantity: 1,
    cost: 10000,
    deliveryInformation: undefined,
  },
  imageUrl: jest.fn(),
  manufacturer: jest.fn(),
  name: jest.fn(),
  quantity: jest.fn(),
  cost: jest.fn(),
}));

test('OrderPage', async () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>
    </ThemeProvider>,
  );

  await waitFor(() => {
    screen.getByLabelText('받는 분 성함');
    screen.getByLabelText('받는 분 주소');
    screen.getByLabelText('받는 분께 보내는 메세지');
    screen.getByRole('button', '선물하기');
  });
});
