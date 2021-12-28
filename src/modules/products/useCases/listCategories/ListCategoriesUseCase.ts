import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/products/infra/entities/Category';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAll();

    return categories;
  }
}
