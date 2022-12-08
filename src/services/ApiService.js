/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    }
  }

  async createOrder(order) {
    const { data } = await this.instance.post('/orders', order);

    return data;
  }

  async fetchOrders(number) {
    const { data } = await this.instance.get(`/orders?page=${number}`);

    return data;
  }

  async fetchOrder(id) {
    const { data } = await this.instance.get(`/orders/${id}`);

    return data;
  }

  async fetchProducts(number) {
    const { data } = await this.instance.get(`/products?page=${number}`);

    return data;
  }

  async fetchProduct(id) {
    const { data } = await this.instance.get(`/products/${id}`);

    return data;
  }

  async postSession({ memberName, password }) {
    const { data } = await this.instance.post('/session', {
      memberName, password,
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchMember() {
    const { data } = await this.instance.get('/members/me');

    return {
      memberName: data.memberName,
      name: data.name,
      amount: data.amount,
    };
  }

  async createMember({ name, memberName, password }) {
    const { data } = await this.instance.post('/members', {
      name, memberName, password,
    });

    return data;
  }

  async countMember(memberName) {
    const { data } = await this.instance.get(`/members?countOnly=true&memberName=${memberName}`);

    return data;
  }
}

export const apiService = new ApiService();
