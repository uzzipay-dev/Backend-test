import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/categories/infra/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

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
