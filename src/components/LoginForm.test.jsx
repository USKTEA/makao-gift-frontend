import {
  screen, render, fireEvent, waitFor,
} from '@testing-library/react';

import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('LoginForm', async () => {
  render(<LoginForm />);

  screen.getByRole('heading', { name: 'USER LOGIN' });

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'ashal1234' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Password1234!' },
  });

  fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

  await waitFor(() => {
    expect(navigate).toBeCalledWith(-1);
  });
});
