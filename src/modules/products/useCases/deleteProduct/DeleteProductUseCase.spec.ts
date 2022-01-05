import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { DeleteProductUseCase } from './DeleteProductUseCase';

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let deleteProductUseCase: DeleteProductUseCase;

describe('Delete product by id', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productsRepositoryInMemory);
  });

  it('should be possible to delete a product by id', async () => {
    const product1 = {
      name: 'test 1',
      price: 1800,
      categories_ids: ['id fake']
    };

    const product2 = {
      name: 'test 2',
      price: 1800,
      categories_ids: ['id fake']
    };

    const createdProduct1 = await productsRepositoryInMemory.create(product1);
    const createdProduct2 = await productsRepositoryInMemory.create(product2);

    await deleteProductUseCase.execute(createdProduct2.id);

    const listProducts = await productsRepositoryInMemory.listAll();

    expect(createdProduct1).toHaveProperty('id');
    expect(createdProduct2).toHaveProperty('id');
    expect(listProducts).toHaveLength(1);
    expect(listProducts.find(p => p.id === createdProduct1.id)).toEqual(
      createdProduct1
    );
  });

  it('should not be possible to delete a product if it is not found by id', async () => {
    await expect(deleteProductUseCase.execute('id test')).rejects.toEqual(
      new AppError('Product not found')
    );
  });
});
