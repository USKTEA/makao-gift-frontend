import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

import SignUpSuccessPage from './SignUpSuccessPage';

import defaultTheme from '../styles/defaultTheme';

test('SignUpSuccessPage', () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <SignUpSuccessPage />
      </MemoryRouter>
    </ThemeProvider>,

  );

  screen.getByText('회원가입 완료');
});
