import { render, screen } from '@testing-library/react';

import ProductDetailPage from './ProductDetailPage';

test('ProductDetailPage', () => {
  render(<ProductDetailPage />);

  screen.getByAltText('상품이미지');

  screen.getByText('초콜릿');
  screen.getByText('제조사');
  screen.getByText('구매수량');
  screen.getByText('상품설명');
  screen.getByText('총 상품금액:');
  screen.getByRole('button', { name: '선물하기' });
});
