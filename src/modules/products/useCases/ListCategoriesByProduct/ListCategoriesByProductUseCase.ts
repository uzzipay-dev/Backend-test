import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ListCategoriesByProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
