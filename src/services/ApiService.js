/* eslint-disable class-methods-use-this */

import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async fetchProducts(number) {
    const url = `${baseUrl}/products?page=${number}`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchProduct(id) {
    const url = `${baseUrl}/products/${id}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const apiService = new ApiService();
