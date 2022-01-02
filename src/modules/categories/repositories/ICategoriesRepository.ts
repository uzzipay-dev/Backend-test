import { Category } from '../infra/entities/Category';

interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  listAll(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  deleteById(id: string): Promise<void>;
  update(id: string, name: string): Promise<void>;
}

export { ICategoriesRepository };
