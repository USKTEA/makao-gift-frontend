import Order from './Order';

test('Order', () => {
  const order = new Order({});

  expect(order.getOrderNumber()).toBeTruthy();
});
