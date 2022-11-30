import { render, screen } from '@testing-library/react';

import ProductDetail from './ProductDetail';

jest.mock('../hooks/useProductStore', () => () => ({
  selected: {
    id: 1,
    name: '초콜릿',
    manufacturer: 'Jocker',
    price: 10000,
    description: 'yammy chocolate',
  },
}));

test('ProductDetail', () => {
  render(<ProductDetail />);

  screen.getByText('초콜릿');
  screen.getByAltText('상품이미지');
  screen.getByText('Jocker');
  screen.getByText('yammy chocolate');
});
