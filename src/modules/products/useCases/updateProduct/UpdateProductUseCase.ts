import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { Product } from '@modules/products/infra/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  categories_ids?: string[];
}

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    id,
    name,
    price,
    categories_ids
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (categories_ids) {
      const categories = await this.categoriesRepository.findByIds(
        categories_ids
      );

      product.categories = categories;
    }

    await this.productsRepository.updateById(product);

    const productUpdated = await this.productsRepository.findById(id);

    return productUpdated;
  }
}
