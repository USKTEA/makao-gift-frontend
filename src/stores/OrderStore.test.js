import OrderSpecification from '../models/OrderSpecification';

import OrderStore from './OrderStore';

const context = describe;

describe('OrderStore', () => {
  let orderStore = '';

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  describe('request order', () => {
    context('when request order called', () => {
      it('create order with specification and send request', async () => {
        const orderSpecification = OrderSpecification.fake('초콜릿');

        const orderId = await orderStore.createOrder(
          { specification: orderSpecification },
        );

        expect(orderId).toBeTruthy();
      });
    });
  });

  describe('fetch order', () => {
    beforeEach(async () => {
      await orderStore.fetchOrders();
      await orderStore.fetchOrder(1);
    });

    context('when member has order history', () => {
      it('get orders', async () => {
        const orders = orderStore.getOrders();

        expect(orders.length).not.toBe(0);
      });
    });

    context('when fetch one specific order', () => {
      it('get a order', async () => {
        const selected = orderStore.getSelected();

        expect(selected).toBeTruthy();
      });
    });
  });
});
