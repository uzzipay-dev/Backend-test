import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from './CreateProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe('Create a new product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });

  it('should be able to create a new product', async () => {
    const product = {
      name: 'test',
      price: 1800
    };

    const response = await createProductUseCase.execute(product);
    const listProducts = await productsRepositoryInMemory.listAll();

    expect(response).toHaveProperty('id');
    expect(response.name).toEqual(product.name);
    expect(listProducts.length).toEqual(1);
  });

  it('should not be able to create a product if name already exist', async () => {
    const product = {
      name: 'test',
      price: 1800
    };

    await createProductUseCase.execute(product);

    await expect(createProductUseCase.execute(product)).rejects.toEqual(
      new AppError('product already exists')
    );
  });
});
