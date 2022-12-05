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

        const orderId = await orderStore.requestOrder({ specification: orderSpecification });

        expect(orderId).toBeTruthy();
      });
    });
  });
});
