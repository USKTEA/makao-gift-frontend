import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';

import LoginPage from './LoginPage';

const context = describe;

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

describe('LoginPage', () => {
  context('when logged in', () => {
    it('navigate to homePage', async () => {
      render(
        <ThemeProvider theme={defaultTheme}>
          <LoginPage />
        </ThemeProvider>,
      );

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'ashal1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Password1234!' },
      });

      fireEvent.click(screen.getByRole('button', '로그인하기'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith(-1);
      });
    });
  });
});
