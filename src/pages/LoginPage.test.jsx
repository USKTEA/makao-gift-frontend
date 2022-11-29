import { render, screen } from '@testing-library/react';

import LoginPage from './LoginPage';

test('LoginPage', () => {
  render(<LoginPage />);

  screen.getByPlaceholderText('아이디');
  screen.getByPlaceholderText('비밀번호');

  screen.getByRole('button', '로그인하기');
});
