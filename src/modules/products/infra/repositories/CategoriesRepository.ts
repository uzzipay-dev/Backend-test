import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';

import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(name: string): Promise<Category> {
    const category = this.repository.create({ name });

    await this.repository.save(category);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}
