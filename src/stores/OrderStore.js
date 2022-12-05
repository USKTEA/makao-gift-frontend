/* eslint-disable class-methods-use-this */
import Order from '../models/Order';

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.orders = new Set();
  }

  async requestOrder({ specification }) {
    const order = new Order({ specification });

    const { id } = await apiService.postOrder({ ...order });

    return id;
  }

  orders() {
    return this.orders;
  }
}

export const orderStore = new OrderStore();
