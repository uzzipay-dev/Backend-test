import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productsRepository.deleteById(product.id);
  }
}
