import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Product } from '../infra/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product>;
  listAll(): Promise<Product[]>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Product>;
}

export { IProductsRepository };
