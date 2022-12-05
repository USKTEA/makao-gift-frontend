import OrderSpecification from './OrderSpecification';

const context = describe;

describe('OrderSpecification', () => {
  let orderSpecification;

  beforeEach(() => {
    const product = {
      productId: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 10_000,
      description: 'yammy chocolate',
      productImageUrl: '1',
    };

    orderSpecification = new OrderSpecification({
      buyer: 'ashal1234',
      product,
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

  describe('delivery information', () => {
    context('when add delivery information', () => {
      it('add delivery information', () => {
        expect(orderSpecification.deliveryInformation).toBeFalsy();

        const deliveryInformation = {
          recipient: '김아샬',
          address: '서울시 조커동 아샬구',
          message: '압도적감사',

        };

        const added = orderSpecification.addDeliveryInformation(
          deliveryInformation,
        );

        expect(added.deliveryInformation).toEqual(deliveryInformation);
      });
    });
  });

  describe('fake', () => {
    context('when fake called', () => {
      it('create fake orderSpecification use input parameter', () => {
        const fake = OrderSpecification.fake('초콜릿');

        const { product } = fake;

        expect(product.name).toBe('초콜릿');
      });
    });
  });
});
