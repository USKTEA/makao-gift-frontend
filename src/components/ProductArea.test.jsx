import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import ProductArea from './ProductArea';

import defaultTheme from '../styles/defaultTheme';

test('ProductArea', () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <ProductArea
        name="초콜릿"
        manufacturer="Jocker"
        quantity="1"
        imageUrl="1"
        cost="10000"
      />
    </ThemeProvider>,

  );

  screen.getByText('Jocker');
  screen.getByText('초콜릿');
  screen.getByText('구매수량: 1');
  screen.getByText('총 상품금액: 10,000원');
});
