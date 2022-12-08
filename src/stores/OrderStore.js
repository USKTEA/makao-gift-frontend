/* eslint-disable class-methods-use-this */
import Order from '../models/Order';

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.orders = [];
    this.selected = '';
    this.page = '';
  }

  async createOrder({ specification }) {
    const order = new Order({ specification });

    const { id } = await apiService.createOrder({ ...order });

    return id;
  }

  async fetchOrders(pageNumber = '') {
    const { orders, page } = await apiService.fetchOrders(pageNumber);

    this.orders = orders;
    this.page = page;

    this.publish();
  }

  async fetchOrder(id) {
    this.selected = await apiService.fetchOrder(id);

    this.publish();
  }

  getOrders() {
    return this.orders;
  }

  getSelected() {
    return this.selected;
  }

  getPage() {
    return this.page;
  }
}

export const orderStore = new OrderStore();
