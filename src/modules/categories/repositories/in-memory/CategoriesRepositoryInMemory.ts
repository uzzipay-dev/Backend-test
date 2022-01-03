import { Category } from '@modules/categories/infra/entities/Category';

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

  async findById(id: string): Promise<Category> {
    return this.categories.find(category => category.id === id);
  }

  async deleteById(id: string): Promise<void> {
    const category = this.categories.find(category => category.id === id);
    this.categories.splice(this.categories.indexOf(category));
  }

  async update(id: string, name: string): Promise<void> {
    const category = this.categories.find(product => product.id === id);

    this.categories.splice(this.categories.indexOf(category));

    Object.assign(category, {
      id,
      name
    });

    this.categories.push(category);
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    const categories = this.categories.filter(category =>
      ids.includes(category.id)
    );

    return categories;
  }
}
