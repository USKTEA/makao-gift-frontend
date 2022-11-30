import { apiService } from '../services/ApiService';

export default class ProductStore {
  constructor() {
    this.products = [];
    this.selected = '';

    this.listeners = new Set();
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();

    this.publish();
  }

  async fetchProduct(id) {
    this.selected = await apiService.fetchProduct(id);

    this.publish();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const productStore = new ProductStore();
