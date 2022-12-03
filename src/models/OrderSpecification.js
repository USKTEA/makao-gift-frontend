export default class OrderSpecification {
  constructor({
    buyer, productId, productName, productManufacturer,
    productPrice, productDescription, productImageUrl, quantity,
  }) {
    this.buyer = buyer;
    this.productId = productId;
    this.productName = productName;
    this.productManufacturer = productManufacturer;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productImageUrl = productImageUrl;
    this.quantity = quantity || 1;
    this.cost = this.productPrice * this.quantity;
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
}
