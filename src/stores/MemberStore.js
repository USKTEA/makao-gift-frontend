import { apiService } from '../services/ApiService';

export default class MemberStore {
  constructor() {
    this.name = '';
    this.amount = 0;

    this.listeners = new Set();
  }

  async login({ memberName, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession(
        { memberName, password },
      );

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      return ''; // 예외처리 필요
    } finally {
      this.publish();
    }
  }

  async fetchMember() {
    const { name, amount } = await apiService.fetchMember();

    this.name = name;
    this.amount = amount;

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

export const memberStore = new MemberStore();
