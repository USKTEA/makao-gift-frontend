import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import OrderForm from './OrderForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('OrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when fill fields correctly', () => {
    it('navigate to orders page', async () => {
      render(<OrderForm />);

      fireEvent.change(screen.getByLabelText('받는 분 성함'), {
        target: {
          value: '김아샬',
        },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소'), {
        target: {
          value: '서울시 조커구 아샬동',
        },
      });

      fireEvent.click(screen.getByRole('button', '선물하기'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/orders');
      });
    });
  });

  describe('recipient name field', () => {
    context('when did not filled recipient name field', () => {
      it('render order failed message', async () => {
        render(<OrderForm />);

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: {
            value: '',
          },
        });

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: {
            value: '서울시 조커구 아샬동',
          },
        });

        fireEvent.click(screen.getByRole('button', '선물하기'));

        await waitFor(() => {
          expect(navigate).not.toBeCalled();
          screen.getByText('성함을 입력해주세요');
        });
      });
    });

    context('when fill recipient name field with number', () => {
      it('render order failed message', async () => {
        render(<OrderForm />);

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: {
            value: '아샬1234',
          },
        });

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: {
            value: '서울시 조커구 아샬동',
          },
        });

        fireEvent.click(screen.getByRole('button', '선물하기'));

        await waitFor(() => {
          expect(navigate).not.toBeCalled();
          screen.getByText('이름을 다시 확인해주세요');
        });
      });
    });

    context('when fill recipient name field with none korean', () => {
      it('render order failed message', async () => {
        render(<OrderForm />);

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: {
            value: 'ashal',
          },
        });

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: {
            value: '서울시 조커구 아샬동',
          },
        });

        fireEvent.click(screen.getByRole('button', '선물하기'));

        await waitFor(() => {
          expect(navigate).not.toBeCalled();
          screen.getByText('이름을 다시 확인해주세요');
        });
      });
    });

    context(
      'when fill recipient name field less than two korean characters',
      () => {
        it('render order failed message', async () => {
          render(<OrderForm />);

          fireEvent.change(screen.getByLabelText('받는 분 성함'), {
            target: {
              value: '김아',
            },
          });

          fireEvent.change(screen.getByLabelText('받는 분 주소'), {
            target: {
              value: '서울시 조커구 아샬동',
            },
          });

          fireEvent.click(screen.getByRole('button', '선물하기'));

          await waitFor(() => {
            expect(navigate).not.toBeCalled();
            screen.getByText('이름을 다시 확인해주세요');
          });
        });
      },
    );

    context(
      'when fill recipient name field more than seven korean characters',
      () => {
        it('shows only first seven characters', async () => {
          render(<OrderForm />);

          fireEvent.change(screen.getByLabelText('받는 분 성함'), {
            target: {
              value: '저는김아샬입니다',
            },
          });

          fireEvent.change(screen.getByLabelText('받는 분 주소'), {
            target: {
              value: '서울시 조커구 아샬동',
            },
          });

          await waitFor(() => {
            expect(screen.getByLabelText('받는 분 성함')).not.toHaveValue('다');
          });
        });
      },
    );
  });

  describe('recipient address field', () => {
    context('when did not filled recipient address field', () => {
      it('render order failed message', async () => {
        render(<OrderForm />);

        fireEvent.change(screen.getByLabelText('받는 분 성함'), {
          target: {
            value: '김아샬',
          },
        });

        fireEvent.change(screen.getByLabelText('받는 분 주소'), {
          target: {
            value: '',
          },
        });

        fireEvent.click(screen.getByRole('button', '선물하기'));

        await waitFor(() => {
          expect(navigate).not.toBeCalled();
          screen.getByText('주소를 입력해주세요');
        });
      });
    });
  });

  describe('message field', () => {
    context('when type more than 100 characters to message field', () => {
      it('only shows first 100 characters', () => {
        render(<OrderForm />);

        fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
          target: {
            value: '압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사'
            + '압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사'
            + '압도적감사압도적감사압도적감사압도적감사압도적감사'
            + '백자넘는부분',
          },
        });

        expect(screen.getByLabelText('받는 분께 보내는 메세지'))
          .not.toHaveValue('백자넘는부분');
      });
    });
  });
});
