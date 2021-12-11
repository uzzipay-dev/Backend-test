import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.listAll();

    return products;
  }
}
