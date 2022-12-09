import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import SignUpPage from './SignUpPage';

import defaultTheme from '../styles/defaultTheme';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const isLoggedIn = jest.fn();

jest.mock('../hooks/useMemberStore', () => () => ({
  isLoggedIn,
}));

const context = describe;

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when member logged in', () => {
    it('navigate to homepage', () => {
      isLoggedIn.mockReturnValue(true);

      render(
        <ThemeProvider theme={defaultTheme}>
          <SignUpPage />
        </ThemeProvider>,
      );

      expect(navigate).toBeCalledWith('/');
    });

    context('when did not log in', () => {
      isLoggedIn.mockReturnValue(false);

      render(
        <ThemeProvider theme={defaultTheme}>
          <SignUpPage />
        </ThemeProvider>,
      );

      screen.getByText('SIGN UP');
    });
  });
});
