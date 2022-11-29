import { render, screen } from '@testing-library/react';
import OrdersPage from './OrdersPage';

test('OrdersPage', () => {
  render(<OrdersPage />);

  screen.getByAltText('상품이미지');
  screen.getByText(/To./);
  screen.getByRole('link', { name: '1' });
});
