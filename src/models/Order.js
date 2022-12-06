/* eslint-disable class-methods-use-this */
export default class Order {
  constructor({ specification }) {
    this.orderNumber = this.orderNumber();
    this.specification = { ...specification };
  }

  orderNumber() {
    const number = String(new Date().getTime())
      .split('')
      .slice(0, 9)
      .join('');

    return number;
  }

  getOrderNumber() {
    return this.orderNumber;
  }
}
