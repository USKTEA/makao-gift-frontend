/* eslint-disable class-methods-use-this */

import { apiService } from '../services/ApiService';

import Member from '../models/Member';

import Store from './Store';

export default class MemberStore extends Store {
  constructor() {
    super();

    this.member = ''; // 이거 뭐 '' 빈문자열이 아닌걸로 대체 가능할까
    this.error = '';
  }

  canAfford(cost) {
    return this.member.canAfford({ cost });
  }

  payFor({ cost }) {
    this.member.pay({ cost });

    this.publish();
  }

  async login({ memberName, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession(
        { memberName, password },
      );

      this.member = new Member({ memberName, name, amount });

      return accessToken;
    } catch (error) {
      this.error = '아이디 혹은 비밀번호가 맞지 않습니다';

      return '';
    } finally {
      this.publish();
    }
  }

  async signUp({ name, memberName, password }) {
    const { id } = await apiService.createMember(
      { name, memberName, password },
    );

    return id;
  }

  async fetchMember() {
    const { memberName, name, amount } = await apiService.fetchMember();

    this.member = new Member({ memberName, name, amount });

    this.publish();
  }

  clear() {
    this.member = null;

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

  getError() {
    return this.error;
  }
}

export const memberStore = new MemberStore();
