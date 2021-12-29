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

  async listAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne({ id });

    return category;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async update(id: string, name: string): Promise<void> {
    await this.repository.save({
      id,
      name
    });
  }
}
