import { Category } from '@modules/products/infra/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name
    });

    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }

  async listAll(): Promise<Category[]> {
    const allCategories = this.categories;

    return allCategories;
  }
}
