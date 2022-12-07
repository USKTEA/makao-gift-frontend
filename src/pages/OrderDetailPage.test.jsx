import { render, screen } from '@testing-library/react';

import OrderDetailPage from './OrderDetailPage';

const context = describe;

const navigate = jest.fn();
const params = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
  useParams() {
    return params;
  },
}));

const fetchOrder = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  selected: {
    id: 1,
    orderItem: {
      id: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 1000,
      description: 'yammy chocolate',
      imageUrl: '1',
    },
    quantity: 6,
    cost: 6000,
    createdAt: '2022-12-05T20:52:16.213867',
    deliveryInformation: {
      recipient: 'faker',
      address: '서울시 성동구 상원동',
      message: '중꺾맘',
    },
  },
  fetchOrder,
}));

const isLoggedIn = jest.fn();

jest.mock('../hooks/useMemberStore', () => () => ({
  isLoggedIn,
}));

describe('OrderDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('accessToken');
  });
  context('when member did not logged in', () => {
    it('navigate to login page', () => {
      isLoggedIn.mockReturnValue(false);

      render(<OrderDetailPage />);

      expect(navigate).toBeCalledWith('/login');
    });
  });

  context('when member did logged in', () => {
    it('navigate to login page', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESSTOKEN'));
      isLoggedIn.mockReturnValue(true);

      render(<OrderDetailPage />);

      expect(navigate).not.toBeCalled();

      screen.getByRole('link', { name: '상품이미지' });
    });
  });
});
