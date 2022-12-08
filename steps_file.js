/* eslint-disable no-undef */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  async setUpProducts(amount) {
    const products = Array
      .from({ length: amount }, (_, index) => index + 1)
      .reduce((acc, number) => [...acc, {
        id: number,
        name: `상품${number}`,
        manufacturer: 'test',
        price: 10000,
        description: `${number}번째 상품`,
        imageUrl: number,
      }], []);

    await this.sendPostRequest('/setup-products', {
      products,
    });
  },
  async setUpProduct({
    id, name, manufacturer, price, description, imageUrl,
  }) {
    await this.sendPostRequest('/setup-product', {
      id, name, manufacturer, price, description, imageUrl,
    });
  },
  async clearDatabase() {
    await this.sendDeleteRequest('/clear-database');
  },
  async setUpUser() {
    await this.sendPostRequest('/setup-user');
  },
  login(userName) {
    this.amOnPage('/');
    this.click('로그인');

    this.fillField('아이디', userName);
    this.fillField('비밀번호', 'Password1234!');
    this.click('로그인하기');

    this.waitForText('로그아웃');
  },
  changeAmount({ memberId, amount }) {
    this.amOnPage([
      `${backdoorBaseUrl}/change-amount?`,
      `memberId=${memberId}&amount=${amount}`,
    ].join(''));
    this.amOnPage('/');
  },
  choose({ productName, amount }) {
    this.click(productName);
    this.see(amount);
    this.click('선물하기');
  },
  async sendGiftTo({ recipient }) {
    this.click('스토어');
    this.click('초콜릿');
    this.click('선물하기');
    this.fillField('받는 분 성함', recipient);
    this.fillField('받는 분 주소', '서울시 성동수 상원동');
    this.click('선물하기');
  },
  logout() {
    this.click('로그아웃');
  },
});
