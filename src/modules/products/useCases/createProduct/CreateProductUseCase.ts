import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  categories_ids: string[];
}

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, price, categories_ids }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('product already exists');
    }

    const categories = await this.categoriesRepository.findByIds(
      categories_ids
    );

    const product = await this.productsRepository.create({
      name,
      price,
      categories
    });

    return product;
  }
}
