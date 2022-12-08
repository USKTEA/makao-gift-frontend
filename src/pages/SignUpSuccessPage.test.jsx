import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SignUpSuccessPage from './SignUpSuccessPage';

test('SignUpSuccessPage', () => {
  render(
    <MemoryRouter>
      <SignUpSuccessPage />
    </MemoryRouter>,
  );

  screen.getByText('회원가입 완료');
});
