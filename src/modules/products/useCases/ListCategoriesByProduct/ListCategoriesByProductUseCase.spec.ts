import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { ListCategoriesByProductUseCase } from './ListCategoriesByProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesByProductUseCase: ListCategoriesByProductUseCase;

describe('list categories by product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesByProductUseCase = new ListCategoriesByProductUseCase(
      productsRepositoryInMemory
    );
  });

  it('should be able to list categories by product', async () => {
    const category = { name: 'category test 1' };

    const createdCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    const product1 = {
      name: 'product test 1',
      price: 1000,
      categories_ids: [createdCategory.id]
    };

    const createdProduct = await productsRepositoryInMemory.create(product1);

    const response = await listCategoriesByProductUseCase.execute(
      createdProduct.id
    );

    expect(response.id).toEqual(createdProduct.id);
    expect(response.name).toEqual(createdProduct.name);
    expect(response).toHaveProperty('categories');
  });

  it('should not be able list category by product if id not exists', async () => {
    await expect(listCategoriesByProductUseCase.execute('id')).rejects.toEqual(
      new AppError('Product not found')
    );
  });
});
