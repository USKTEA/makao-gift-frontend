import { v4 as uuidv4 } from 'uuid';

export default class Order {
  constructor({ specification }) {
    this.orderNumber = uuidv4();
    this.specification = { ...specification };
  }
}
