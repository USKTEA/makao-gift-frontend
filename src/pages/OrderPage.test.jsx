import { render, screen } from '@testing-library/react';
import OrderPage from './OrderPage';

test('OrderPage', () => {
  render(<OrderPage />);

  screen.getByAltText('상품이미지');
  screen.getByText('제조사');
  screen.getByText(/구매수량/);
  screen.getByText(/총 상품금액/);
  screen.getByLabelText('받는 분 성함');
  screen.getByLabelText('받는 분 주소');
  screen.getByLabelText('받는 분께 보내는 메세지');
  screen.getByRole('button', '선물하기');
});
