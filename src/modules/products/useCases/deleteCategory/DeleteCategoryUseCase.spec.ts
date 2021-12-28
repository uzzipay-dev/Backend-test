import { CategoriesRepositoryInMemory } from '@modules/products/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to delete a category by id', async () => {
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

    const listCategories = await categoriesRepositoryInMemory.listAll();
    expect(listCategories).toHaveLength(2);

    const { id } = createdCategory2;

    await deleteCategoryUseCase.execute({ id });

    const listCategories2 = await categoriesRepositoryInMemory.listAll();

    expect(createdCategory1).toHaveProperty('id');
    expect(createdCategory2).toHaveProperty('id');
    expect(listCategories2).toHaveLength(1);
    expect(listCategories2.find(p => p.id === createdCategory1.id)).toEqual(
      createdCategory1
    );
  });

  it('should not be able to delete category if it is not found by id', async () => {
    const id = 'id test';
    await expect(deleteCategoryUseCase.execute({ id })).rejects.toEqual(
      new AppError('Category not found')
    );
  });
});
