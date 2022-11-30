import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import ProductDetailPage from './ProductDetailPage';

const context = describe;

describe('ProductDetailPage', () => {
  context('when pathname is /product/1', () => {
    it('show product detail which id is 1', async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/products/1' }]}>
          <ProductDetailPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        screen.getByAltText('상품이미지');
        screen.getByText('초콜릿');
      });
    });
  });

  context('when pathname is /product/2', () => {
    it('show product detail which id is 2', async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/products/2' }]}>
          <ProductDetailPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        screen.getByAltText('상품이미지');
        screen.getByText('사탕');
      });
    });
  });
});
