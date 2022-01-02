import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';

import { ListProductsUseCase } from './ListProductsUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listProductsUseCase: ListProductsUseCase;

describe('List all products', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productsRepositoryInMemory);
  });

  it('should be possible to list all the products', async () => {
    const category1 = {
      name: 'category test 1'
    };

    const category2 = {
      name: 'category test 2'
    };

    const createdCategory1 = await categoriesRepositoryInMemory.create(
      category1.name
    );
    const createdCategory2 = await categoriesRepositoryInMemory.create(
      category2.name
    );

    const product1 = {
      name: 'test 1',
      price: 1800,
      categories_ids: [createdCategory1.id, createdCategory2.id]
    };

    const product2 = {
      name: 'test 2',
      price: 1800,
      categories_ids: [createdCategory1.id, createdCategory2.id]
    };

    await productsRepositoryInMemory.create(product1);
    await productsRepositoryInMemory.create(product2);

    const listProduct = await listProductsUseCase.execute();

    expect(listProduct).toHaveLength(2);
  });
});
