import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/categories/infra/entities/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name?: string;
}

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found');
    }

    const categoryNameAlreadyExists =
      await this.categoriesRepository.findByName(name);

    if (categoryNameAlreadyExists) {
      throw new AppError('Category already exists');
    }

    if (name) {
      category.name = name;
    }

    await this.categoriesRepository.update(category.id, category.name);

    const updatedCategory = await this.categoriesRepository.findById(id);

    return updatedCategory;
  }
}
