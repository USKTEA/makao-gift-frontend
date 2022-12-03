import OrderSpecificationStore from './OrderSpecificationStore';

const context = describe;

describe('OrderSpecification', () => {
  let orderSpecificationStore = '';
  let selected = '';
  let buyer = '';

  beforeEach(() => {
    orderSpecificationStore = new OrderSpecificationStore();
    selected = {
      id: 1,
      name: '초콜릿',
      manufacturer: 'Jocker',
      price: 10_000,
      description: 'yammy chocolate',
      imageUrl: 1,
    };
    buyer = 'ashal1234';
  });

  context('when create specification', () => {
    it('create specification with buyer and product requirement', () => {
      expect(orderSpecificationStore.orderSpecification).toBeFalsy();

      orderSpecificationStore.createSpecification({
        buyer,
        selected,
      });

      expect(orderSpecificationStore.orderSpecification).toBeTruthy();
    });
  });

  context('when increase quantity', () => {
    it('increase specification quantity', () => {
      orderSpecificationStore.createSpecification({
        buyer,
        selected,
      });

      expect(orderSpecificationStore.quantity()).toBe(1);

      orderSpecificationStore.increaseQuantity();

      expect(orderSpecificationStore.quantity()).toBe(2);
    });

    context('when decrease quantity', () => {
      it('decrease specification quantity', () => {
        orderSpecificationStore.createSpecification({
          buyer,
          selected,
        });

        expect(orderSpecificationStore.quantity()).toBe(1);

        orderSpecificationStore.increaseQuantity();

        expect(orderSpecificationStore.quantity()).toBe(2);

        orderSpecificationStore.decreaseQuantity();

        expect(orderSpecificationStore.quantity()).toBe(1);
      });
    });

    context('when decrease quantity quantity is 1', () => {
      it('do not decrease quantity', () => {
        orderSpecificationStore.createSpecification({
          buyer,
          selected,
        });

        expect(orderSpecificationStore.quantity()).toBe(1);

        orderSpecificationStore.decreaseQuantity();

        expect(orderSpecificationStore.quantity()).toBe(1);
      });
    });

    context('when modify quantity', () => {
      it('modify specification quantity', () => {
        orderSpecificationStore.createSpecification({
          buyer,
          selected,
        });

        expect(orderSpecificationStore.quantity()).toBe(1);

        orderSpecificationStore.modifyQuantity(3);

        expect(orderSpecificationStore.quantity()).toBe(3);
      });
    });

    context('when modify quantity lower than 1', () => {
      it('do not modify specification quantity', () => {
        orderSpecificationStore.createSpecification({
          buyer,
          selected,
        });

        expect(orderSpecificationStore.quantity()).toBe(1);

        orderSpecificationStore.modifyQuantity(-1);

        expect(orderSpecificationStore.quantity()).toBe(1);
      });
    });
  });
});
