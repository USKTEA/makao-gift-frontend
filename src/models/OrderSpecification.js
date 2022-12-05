export default class OrderSpecification {
  constructor({
    buyer, product, quantity, deliveryInformation,
  }) {
    this.buyer = buyer;
    this.product = product;
    this.quantity = quantity || 1;
    this.cost = this.product.price * this.quantity;
    this.deliveryInformation = deliveryInformation;
  }

  addDeliveryInformation({ recipient, address, message }) {
    const deliveryInformation = {
      recipient,
      address,
      message,
    };

    return new OrderSpecification({ ...this, deliveryInformation });
  }

  increaseQuantity() {
    return new OrderSpecification({
      ...this, quantity: this.quantity + 1,
    });
  }

  decreaseQuantity() {
    if (this.quantity === 1) {
      return this;
    }

    return new OrderSpecification({
      ...this, quantity: this.quantity - 1,
    });
  }

  modifyQuantity(number) {
    if (number < 1) {
      return this;
    }

    return new OrderSpecification({
      ...this, quantity: number,
    });
  }

  static fake(productName) {
    const buyer = 'faker1234';
    const product = {
      id: 8888,
      name: productName,
      manufacturer: 'Faker',
      price: 8888,
      description: 'yammy fake chocolate',
      imageUrl: 8888,
    };
    const deliveryInformation = {
      recipient: '페이커',
      address: '서울시 성동구 상원동',
      message: '압도적 승리',
    };

    return new OrderSpecification(
      { buyer, product, deliveryInformation },
    );
  }
}
