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
  async clearDatabase() {
    await this.sendDeleteRequest('/setup-products');
  },
  // setUpAccount()

  // setUpProducts(int)
  // setUpProduct(..상품 정보)

  // login(id)
  // changeAmount(int)

  // setUpOrder('productName:''')
  // setUpOrders(int)

});
