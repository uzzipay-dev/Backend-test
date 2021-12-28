import { CategoriesRepositoryInMemory } from '@modules/products/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create a new category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'category test'
    };

    const createdCategory = await createCategoryUseCase.execute(category);

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory.name).toEqual(category.name);
  });

  it('should not be able to create a category if name already exist', async () => {
    const category = {
      name: 'category test'
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('category already exists')
    );
  });
});
