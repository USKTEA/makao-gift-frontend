import { render } from '@testing-library/react';
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

test('ProductsPage', () => {
  render(<ProductsPage />);
});
