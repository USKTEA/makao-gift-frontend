import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.selected = '';
    this.page = '';
  }

  async fetchProducts(pageNumber = '') {
    const { products, page } = await apiService.fetchProducts(pageNumber);

    this.products = products;
    this.page = page;

    this.publish();
  }

  async fetchProduct(id) {
    this.selected = await apiService.fetchProduct(id);

    this.publish();
  }
}

export const productStore = new ProductStore();
