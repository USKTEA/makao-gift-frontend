/* eslint-disable class-methods-use-this */
import Order from '../models/Order';

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.orders = [];
    this.page = '';
  }

  async requestOrder({ specification }) {
    const order = new Order({ specification });

    const { id } = await apiService.postOrder({ ...order });

    return id;
  }

  async fetchOrders(pageNumber = '') {
    const { orders, page } = await apiService.fetchOrders(pageNumber);

    this.orders = orders;
    this.page = page;

    this.publish();
  }

  getOrders() {
    return this.orders;
  }

  getPage() {
    return this.page;
  }
}

export const orderStore = new OrderStore();
