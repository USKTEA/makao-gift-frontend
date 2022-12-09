import {
  screen, render, fireEvent, waitFor, cleanup,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import LoginForm from './LoginForm';
import defaultTheme from '../styles/defaultTheme';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when login success', () => {
    it('navigate to previous page', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginForm />
        </ThemeProvider>,
      );

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
  });

  context('when id field is blank', () => {
    it('show error message', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginForm />
        </ThemeProvider>,
      );

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });
  });

  context('when password field is blank', () => {
    it('show error message', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginForm />
        </ThemeProvider>,
      );

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'ashal1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('when cant find member by memberName', () => {
    it('show error message', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginForm />
        </ThemeProvider>,
      );

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'notfound' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  context('when password is incorrect', () => {
    it('show error message', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginForm />
        </ThemeProvider>,
      );

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'ashal1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'incorrect' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
        expect(navigate).not.toBeCalled();
        cleanup();
      });
    });
  });
});
