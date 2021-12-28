import { CategoriesRepositoryInMemory } from '@modules/products/repositories/in-memory/CategoriesRepositoryInMemory';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesUseCase: ListCategoriesUseCase;

describe('List all categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to list all categories', async () => {
    const category1 = {
      name: 'category 1'
    };

    const category2 = {
      name: 'category 2'
    };

    await categoriesRepositoryInMemory.create(category1.name);
    await categoriesRepositoryInMemory.create(category2.name);

    const listCategories = await listCategoriesUseCase.execute();

    expect(listCategories).toHaveLength(2);
  });
});
