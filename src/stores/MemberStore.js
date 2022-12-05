import { apiService } from '../services/ApiService';

import Member from '../models/Member';

import Store from './Store';

export default class MemberStore extends Store {
  constructor() {
    super();
    this.member = '';
  }

  canAfford(cost) {
    return this.member.canAfford({ cost });
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

  clear() {
    this.member = '';

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
}

export const memberStore = new MemberStore();
