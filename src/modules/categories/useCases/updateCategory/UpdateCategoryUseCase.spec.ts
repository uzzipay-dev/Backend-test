import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Update category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to update category name', async () => {
    const category = {
      name: 'test category name'
    };

    const createdCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory.name).toEqual(category.name);

    const updatedCategory = await updateCategoryUseCase.execute({
      id: createdCategory.id,
      name: 'updated name'
    });

    expect(updatedCategory.name).toEqual('updated name');

    const findCategory = await categoriesRepositoryInMemory.findById(
      updatedCategory.id
    );

    expect(findCategory.id).toEqual(createdCategory.id);
  });

  it('should be not able update a category if the id does not exist', async () => {
    await expect(
      updateCategoryUseCase.execute({ id: 'test id', name: 'category test' })
    ).rejects.toEqual(new AppError('Category not found'));
  });

  it('should be not able to update category name if name already exist', async () => {
    const category1 = {
      name: 'test category name1'
    };

    const category2 = {
      name: 'test category name2'
    };

    await categoriesRepositoryInMemory.create(category1.name);
    const createdCategory = await categoriesRepositoryInMemory.create(
      category2.name
    );

    await expect(
      updateCategoryUseCase.execute({
        id: createdCategory.id,
        name: 'test category name1'
      })
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
