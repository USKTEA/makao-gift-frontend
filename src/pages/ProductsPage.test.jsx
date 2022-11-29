import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from './ProductsPage';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

test('ProductsPage', async () => {
  render(<ProductsPage />);

  screen.getByText('상품이 존재하지 않습니다');

  await waitFor(() => {
    screen.getByText('초콜릿');
    screen.getByText('10,000원');
  });
});
