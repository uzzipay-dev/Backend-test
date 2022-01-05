import { CategoriesRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateProductUseCase } from './UpdateProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let updateProductUseCase: UpdateProductUseCase;

describe('Update product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    updateProductUseCase = new UpdateProductUseCase(
      productsRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should be able to update the product name', async () => {
    const category = { name: 'category test' };

    const createdCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    const product = {
      name: 'test update name',
      price: 1800,
      categories_ids: [createdCategory.id]
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.price).toEqual(product.price);

    const updatedProduct = await updateProductUseCase.execute({
      id: createdProduct.id,
      name: 'updated name'
    });

    expect(updatedProduct.name).toEqual('updated name');
    expect(updatedProduct.price).toEqual(product.price);
  });

  it('should be able to update the product price', async () => {
    const category = { name: 'category test' };

    const createdCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    const product = {
      name: 'test update price',
      price: 1800,
      categories_ids: [createdCategory.id]
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.price).toEqual(product.price);

    const updatedProduct = await updateProductUseCase.execute({
      id: createdProduct.id,
      price: 2000
    });

    expect(updatedProduct.price).toEqual(2000);
    expect(updatedProduct.name).toEqual(product.name);
  });

  it('should be able to update the categories to product', async () => {
    const category1 = { name: 'category test 1' };
    const category2 = { name: 'category test 2' };

    const createdCategory1 = await categoriesRepositoryInMemory.create(
      category1.name
    );

    const createdCategory2 = await categoriesRepositoryInMemory.create(
      category2.name
    );

    const product = {
      name: 'product tes',
      price: 1800,
      categories_ids: [createdCategory1.id]
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    const updatedCategories = await updateProductUseCase.execute({
      id: createdProduct.id,
      categories_ids: [createdCategory2.id]
    });

    expect(updatedCategories).toHaveProperty('categories');
  });

  it('should not be able to update a product if the id does not exist', async () => {
    await expect(
      updateProductUseCase.execute({
        id: 'test id',
        name: 'new category test'
      })
    ).rejects.toEqual(new AppError('Product not found'));
  });
});
