import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';

import SignUpForm from './SignUpForm';

const context = describe;

const signUp = jest.fn();

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SignUp Success', () => {
    context('when all signup inputs are correct', () => {
      it('create member information', async () => {
        render(
          <ThemeProvider theme={defaultTheme}>
            <MemoryRouter>
              <SignUpForm />
            </MemoryRouter>
          </ThemeProvider>,
        );

        fireEvent.change(screen.getByLabelText('이름:'), {
          target: { value: '김이박최아샬' },
        });

        await waitFor(() => {
          fireEvent.change(screen.getByLabelText('아이디:'), {
            target: { value: 'ashal12345' },
          });
        });

        fireEvent.change(screen.getByLabelText('비밀번호:'), {
          target: { value: 'Password1234!' },
        });

        fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
          target: { value: 'Password1234!' },
        });

        fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

        await waitFor(() => {
          expect(screen.getByText('해당 아이디는 사용할 수 없습니다')).toBeFalsy();
          expect(navigate).toBeCalledWith('/signup-success');
        });
      });
    });
  });

  describe('SignUp Failed', () => {
    context('when have error with sign up', () => {
      it('dont create member information', () => {
        render(
          <ThemeProvider theme={defaultTheme}>
            <MemoryRouter>
              <SignUpForm />
            </MemoryRouter>
          </ThemeProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

        expect(signUp).not.toBeCalled();
      });
    });
  });
});
