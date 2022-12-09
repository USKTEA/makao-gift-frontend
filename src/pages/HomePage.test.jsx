import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import HomePage from './HomePage';
import defaultTheme from '../styles/defaultTheme';

test('HomePage', () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <HomePage />
    </ThemeProvider>,
  );

  screen.getByRole('heading', { level: 1 });
});
