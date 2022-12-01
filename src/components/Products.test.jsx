import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Products from './Products';

jest.mock('../hooks/useProductStore', () => () => ({
  products: [
    {
      id: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 10000,
      description: 'yammy chocolate',
      imageUrl: 1,
    },
  ],
  page: {
    current: 1,
    total: 1,
  },
  fetchProducts: jest.fn(),
}));

test('Products', () => {
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>,
  );

  screen.getByText('초콜릿');
  screen.getByText('Jocker');
  screen.getByText('10,000원');
});
