import OrderSpecification from './OrderSpecification';

const context = describe;

describe('OrderSpecification', () => {
  let orderSpecification;

  beforeEach(() => {
    orderSpecification = new OrderSpecification({
      buyer: 'ashal1234',
      productId: 1,
      productName: '초콜릿',
      productManufacturer: 'Jocker',
      productPrice: 10_000,
      productDescription: 'yammy chocolate',
      productImageUrl: '1',
    });
  });

  context('when create OrderSpecification', () => {
    it('has default quantity', () => {
      expect(orderSpecification.quantity).toBe(1);
    });

    it('calculate cost with default quantity and product price', () => {
      expect(orderSpecification.cost).toBe(10_000);
    });
  });

  describe('modify quantity', () => {
    context('when increase quantity', () => {
      it('increase its quantity', () => {
        const increased = orderSpecification.increaseQuantity();

        expect(increased.quantity).toBe(2);
      });
    });

    context('when decrease quantity', () => {
      it('decrease its quantity', () => {
        const increased = orderSpecification.increaseQuantity();

        expect(increased.quantity).toBe(2);

        const decreased = increased.decreaseQuantity();

        expect(decreased.quantity).toBe(1);
      });
    });

    context('when quantity is 1', () => {
      it('do not decrease its quantity', () => {
        expect(orderSpecification.quantity).toBe(1);

        const after = orderSpecification.decreaseQuantity();

        expect(after).toEqual(orderSpecification);
      });
    });

    context('when modify quantity directly', () => {
      it('modify its quantity', () => {
        expect(orderSpecification.quantity).toBe(1);

        const modified = orderSpecification.modifyQuantity(3);

        expect(modified.quantity).toBe(3);
      });
    });

    context('when want to modify quantity below 1', () => {
      it('do not modify its quantity', () => {
        expect(orderSpecification.quantity).toBe(1);

        const after = orderSpecification.modifyQuantity(-1);

        expect(after).toEqual(orderSpecification);
      });
    });
  });
});
