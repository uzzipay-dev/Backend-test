import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { ListProductsByCategoryUseCase } from './ListProductsByCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listProductsByCategoryUseCase: ListProductsByCategoryUseCase;

describe('List products by category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able list products by category', async () => {
    const category = { name: 'category test 1' };

    const createdCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    const lisProductsByCategories = await listProductsByCategoryUseCase.execute(
      createdCategory.id
    );

    expect(lisProductsByCategories).toHaveProperty('id');
    expect(lisProductsByCategories.name).toEqual('category test 1');
  });

  it('should not be able to list category if id is invalid', async () => {
    await expect(listProductsByCategoryUseCase.execute('id')).rejects.toEqual(
      new AppError('Product not found')
    );
  });
});
