import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateProductUseCase } from './UpdateProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let updateProductUseCase: UpdateProductUseCase;

describe('Update product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    updateProductUseCase = new UpdateProductUseCase(productsRepositoryInMemory);
  });

  it('should be able to update the product name', async () => {
    const product = {
      name: 'test update name',
      price: 1800,
      category: 'category test'
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.price).toEqual(product.price);
    expect(createdProduct.category).toEqual(product.category);

    const updatedProduct = await updateProductUseCase.execute({
      id: createdProduct.id,
      name: 'updated name'
    });

    expect(updatedProduct.name).toEqual('updated name');
    expect(updatedProduct.price).toEqual(product.price);
    expect(updatedProduct.category).toEqual(product.category);
  });

  it('should be able to update the product price', async () => {
    const product = {
      name: 'test update price',
      price: 1800,
      category: 'category test'
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.price).toEqual(product.price);
    expect(createdProduct.category).toEqual(product.category);

    const updatedProduct = await updateProductUseCase.execute({
      id: createdProduct.id,
      price: 2000
    });

    expect(updatedProduct.price).toEqual(2000);
    expect(updatedProduct.name).toEqual(product.name);
    expect(updatedProduct.category).toEqual(product.category);
  });

  it('should be able to update the product category', async () => {
    const product = {
      name: 'test update category',
      price: 1800,
      category: 'category test'
    };

    const createdProduct = await productsRepositoryInMemory.create(product);

    expect(createdProduct.name).toEqual(product.name);
    expect(createdProduct.price).toEqual(product.price);
    expect(createdProduct.category).toEqual(product.category);

    const updatedProduct = await updateProductUseCase.execute({
      id: createdProduct.id,
      category: 'new category test'
    });

    expect(updatedProduct.category).toEqual('new category test');
    expect(updatedProduct.price).toEqual(product.price);
    expect(updatedProduct.name).toEqual(product.name);
  });

  it('should not be able to update a product if the id does not exist', async () => {
    await expect(
      updateProductUseCase.execute({
        id: 'test id',
        category: 'new category test'
      })
    ).rejects.toEqual(new AppError('Product not found'));
  });
});
