import OrderSpecification from '../models/OrderSpecification';

export default class OrderSpecificationStore {
  constructor() {
    this.orderSpecification = '';

    this.listeners = new Set();
  }

  createSpecification({ buyer, selected }) {
    this.orderSpecification = new OrderSpecification(
      {
        buyer,
        productId: selected.id,
        productName: selected.name,
        productManufacturer: selected.manufacturer,
        productPrice: selected.price,
        productDescription: selected.description,
        productImageUrl: selected.imageUrl,
      },
    );

    this.publish();
  }

  increaseQuantity() {
    this.orderSpecification = this.orderSpecification.increaseQuantity();

    this.publish();
  }

  decreaseQuantity() {
    this.orderSpecification = this.orderSpecification.decreaseQuantity();

    this.publish();
  }

  modifyQuantity(number) {
    this.orderSpecification = this.orderSpecification.modifyQuantity(number);

    this.publish();
  }

  name() {
    return this.orderSpecification.productName;
  }

  manufacturer() {
    return this.orderSpecification.manufacturer;
  }

  cost() {
    return this.orderSpecification.cost;
  }

  quantity() {
    return this.orderSpecification.quantity;
  }

  imageUrl() {
    return this.orderSpecification.productImageUrl;
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

export const orderSpecificationStore = new OrderSpecificationStore();
