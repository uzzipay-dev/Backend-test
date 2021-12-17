import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  category?: string;
}

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({ id, name, category, price }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (name) {
      product.name = name;
    }

    if (category) {
      product.category = category;
    }

    if (price) {
      product.price = price;
    }

    await this.productsRepository.updateById(product);

    const productUpdated = await this.productsRepository.findById(id);

    return productUpdated;
  }
}
