import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  category: string;
}

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({ name, category, price }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('product already exists');
    }

    const product = await this.productsRepository.create({
      name,
      category,
      price
    });

    return product;
  }
}
