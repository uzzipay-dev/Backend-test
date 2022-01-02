import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';

import { ListProductsUseCase } from './ListProductsUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let listProductsUseCase: ListProductsUseCase;

describe('List all products', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productsRepositoryInMemory);
  });

  it('should be possible to list all the products', async () => {
    const product1 = {
      name: 'test 1',
      price: 1800,
      categories_ids: ['id fake']
    };

    const product2 = {
      name: 'test 2',
      price: 1800,
      categories_ids: ['id fake']
    };

    await productsRepositoryInMemory.create(product1);
    await productsRepositoryInMemory.create(product2);

    const listProduct = await listProductsUseCase.execute();

    expect(listProduct).toHaveLength(2);
  });
});
