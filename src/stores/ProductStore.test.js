import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore = new ProductStore();

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProducts', () => {
    context('when fetch many products', () => {
      it('load products', async () => {
        await productStore.fetchProducts();

        const firstProduct = productStore.products[0];

        expect(firstProduct).not.toBeNull();
        expect(firstProduct.name).toBe('초콜릿');
        expect(firstProduct.manufacturer).toBe('Jocker');
        expect(firstProduct.price).toBe(10000);
        expect(firstProduct.description).toBe('yammy chocolate');
      });
    });

    context('when fetch by product id', () => {
      it('loads product which id is 1', async () => {
        const id = 1;

        await productStore.fetchProduct(id);

        const { selected } = productStore;

        expect(selected.name).toBe('초콜릿');
        expect(selected.manufacturer).toBe('Jocker');
        expect(selected.price).toBe(10000);
        expect(selected.description).toBe('yammy chocolate');
      });

      it('loads product which id is 2', async () => {
        const id = 2;

        await productStore.fetchProduct(id);

        const { selected } = productStore;

        expect(selected.name).toBe('사탕');
        expect(selected.manufacturer).toBe('Jocker');
        expect(selected.price).toBe(20000);
        expect(selected.description).toBe('yammy candy');
      });
    });
  });
});
