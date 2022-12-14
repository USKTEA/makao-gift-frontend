import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';

import ProductDetailPage from './ProductDetailPage';

const context = describe;

describe('ProductDetailPage', () => {
  context('when pathname is /product/1', () => {
    it('show product detail which id is 1', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={['/products/1']}>
            <Routes>
              <Route path="/products/:id" element={<ProductDetailPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>,
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
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={['/products/2']}>
            <Routes>
              <Route path="/products/:id" element={<ProductDetailPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>,
      );

      await waitFor(() => {
        screen.getByAltText('상품이미지');
        screen.getByText('사탕');
      });
    });
  });
});
