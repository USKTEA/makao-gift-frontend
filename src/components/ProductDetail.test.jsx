import { render, screen, fireEvent } from '@testing-library/react';

import ProductDetail from './ProductDetail';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/useProductStore', () => () => ({
  selected: {
    id: 1,
    name: '초콜릿',
    manufacturer: 'Jocker',
    price: 10000,
    description: 'yammy chocolate',
  },
}));

const canAfford = jest.fn();
const memberName = jest.fn();
const isLoggedIn = jest.fn();

jest.mock('../hooks/useMemberStore', () => () => ({
  canAfford,
  isLoggedIn,
  memberName,
}));

const createSpecification = jest.fn();
const increaseQuantity = jest.fn();
const decreaseQuantity = jest.fn();
const modifyQuantity = jest.fn();

jest.mock('../hooks/useOrderSpecificationStore', () => () => ({
  createSpecification,
  increaseQuantity,
  decreaseQuantity,
  modifyQuantity,
  getSpecification: jest.fn(),
  cost: jest.fn(),
  quantity: jest.fn(),
}));

const context = describe;

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when render product detail page', () => {
    it('create order specification', () => {
      render(<ProductDetail />);

      expect(createSpecification).toBeCalled();
    });
  });

  describe('click 선물하기', () => {
    context('when do not logged in', () => {
      it('navigate to login page', () => {
        render(<ProductDetail />);

        isLoggedIn.mockReturnValue(false);

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith('/login');
      });
    });

    context('when member can afford', () => {
      it('navigate to order page', () => {
        render(<ProductDetail />);

        isLoggedIn.mockReturnValue(true);
        canAfford.mockReturnValue(true);

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith('/order');
      });
    });

    context('when member can not afford', () => {
      it('do not navigate to order page', () => {
        render(<ProductDetail />);

        isLoggedIn.mockReturnValue(true);
        canAfford.mockReturnValue(false);

        fireEvent.click(screen.getByText('선물하기'));

        screen.getByText('❌잔액이 부족하여 선물하기가 불가합니다❌');
        expect(navigate).not.toBeCalled();
      });
    });
  });

  describe('modify order quantity', () => {
    context('when click increase button', () => {
      it('increase order quantity', () => {
        render(<ProductDetail />);

        fireEvent.click(screen.getByRole('button', { name: '+' }));

        expect(increaseQuantity).toBeCalled();
      });
    });

    context('when click decrease button', () => {
      it('decrease order quantity', () => {
        render(<ProductDetail />);

        fireEvent.click(screen.getByRole('button', { name: '-' }));

        expect(decreaseQuantity).toBeCalled();
      });
    });

    context('when type quantity directly', () => {
      it('reflect input number to order quantity', () => {
        render(<ProductDetail />);

        fireEvent.change(screen.getByLabelText('구매수량'), {
          target: {
            value: 10,
          },
        });

        expect(modifyQuantity).toBeCalled();
      });
    });
  });
});
