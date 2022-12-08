import OrderSpecification from '../models/OrderSpecification';

import Store from './Store';

export default class OrderSpecificationStore extends Store {
  constructor() {
    super();
    this.orderSpecification = '';
  }

  createSpecification({ buyer, selected }) {
    this.orderSpecification = new OrderSpecification(
      {
        buyer,
        product: { ...selected },
      },
    );

    this.publish();
  }

  loadSpecification(specification) {
    const {
      buyer, product, quantity, cost,
    } = specification;

    this.orderSpecification = new OrderSpecification(
      {
        buyer,
        product,
        quantity,
        cost,
      },
    );

    this.publish();
  }

  addDeliveryInformation({ recipient, address, message }) {
    this.orderSpecification = this.orderSpecification.addDeliveryInformation(
      { recipient, address, message },
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

  getSpecification() {
    return this.orderSpecification;
  }

  name() {
    return this.orderSpecification.productName;
  }

  manufacturer() {
    return this.orderSpecification.manufacturer;
  }

  quantity() {
    return this.orderSpecification.quantity;
  }

  cost() {
    return this.orderSpecification.cost;
  }

  imageUrl() {
    return this.orderSpecification.productImageUrl;
  }

  deliveryInformation() {
    return this.orderSpecification.deliveryInformation;
  }
}

export const orderSpecificationStore = new OrderSpecificationStore();
