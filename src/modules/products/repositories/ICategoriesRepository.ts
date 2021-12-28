import { Category } from '../infra/entities/Category';

interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  listAll(): Promise<Category[]>;
}

export { ICategoriesRepository };
