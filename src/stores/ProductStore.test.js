import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore = new ProductStore();

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProducts', () => {
    it('load products information', async () => {
      await productStore.fetchProducts();

      const product = productStore.products[0];

      expect(product).not.toBeNull();
      expect(product.name).toBe('초콜릿');
      expect(product.manufacturer).toBe('Jocker');
      expect(product.price).toBe(10000);
      expect(product.description).toBe('yammy chocolate');
    });
  });
});
