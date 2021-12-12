import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';

import { Product } from '../entities/Product';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({ name, price, category }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      category
    });

    await this.repository.save(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({ name });

    return product;
  }

  async listAll(): Promise<Product[]> {
    const products = await this.repository.find();

    return products;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({ id });

    return product;
  }
}
