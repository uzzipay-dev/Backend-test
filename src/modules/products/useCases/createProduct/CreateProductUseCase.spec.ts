import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from './CreateProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe('Create a new product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new product', async () => {
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

    const product = {
      name: 'product test 1',
      price: 1800,
      categories_ids: [createdCategory1.id, createdCategory2.id]
    };

    const createdProduct = await createProductUseCase.execute(product);
    const listProducts = await productsRepositoryInMemory.listAll();

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.categories).toHaveLength(2);
    expect(listProducts.length).toEqual(1);
  });

  it('should not be able to create a product if name already exist', async () => {
    const product = {
      name: 'test',
      price: 1800,
      categories_ids: ['id_fake']
    };

    await createProductUseCase.execute(product);

    await expect(createProductUseCase.execute(product)).rejects.toEqual(
      new AppError('product already exists')
    );
  });
});
