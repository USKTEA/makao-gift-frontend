import { fireEvent, render, screen } from '@testing-library/react';

import TopBar from './TopBar';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to, style }) {
    return (
      <a href={to} style={style}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('TopBar', () => {
  const renderHeader = () => {
    render((
      <TopBar />));
  };

  context('when logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
    });

    it('render account 잔액 and 로그아웃', () => {
      renderHeader();

      screen.getByText(/잔액/);
      screen.getByText('로그아웃');
    });

    context('when click 로그아웃', () => {
      it('render account 잔액 and 로그아웃', () => {
        renderHeader();

        fireEvent.click(screen.getByRole('button', { name: '로그아웃' }));

        expect(navigate).toBeCalledWith('/');
      });
    });
  });

  context('when logged out', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('render 회원가입 and 로그인', () => {
      renderHeader();

      screen.getByText('회원가입');
      screen.getByText('로그인');
    });
  });
});
