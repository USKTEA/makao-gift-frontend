import { apiService } from '../services/ApiService';

import Member from '../models/Member';

export default class MemberStore {
  constructor() {
    this.member = '';

    this.listeners = new Set();
  }

  canAfford(cost) {
    return this.member.canAfford({ cost });
  }

  clear() {
    this.member = '';

    this.publish();
  }

  async login({ memberName, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession(
        { memberName, password },
      );
      this.member = new Member({ memberName, name, amount });

      return accessToken;
    } catch (e) {
      return ''; // 예외처리 필요
    } finally {
      this.publish();
    }
  }

  async fetchMember() {
    const { memberName, name, amount } = await apiService.fetchMember();

    this.member = new Member({ memberName, name, amount });

    this.publish();
  }

  isLoggedIn() {
    return !!this.member;
  }

  memberName() {
    return this.member.memberName;
  }

  name() {
    return this.member.name;
  }

  amount() {
    return this.member.amount;
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
