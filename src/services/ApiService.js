/* eslint-disable class-methods-use-this */

import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

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

  async postSession({ memberName, password }) {
    const url = `${baseUrl}/session`;

    const { data } = await axios.post(url, {
      memberName, password,
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchMember() {
    const url = `${baseUrl}/members/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return {
      name: data.name,
      amount: data.amount,
    };
  }
}

export const apiService = new ApiService();
