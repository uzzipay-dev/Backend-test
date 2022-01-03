import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';

import { Product } from '../entities/Product';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    price,
    categories
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      categories
    });

    await this.repository.save(product);

    const createdProduct = await this.repository.findOne(product.id, {
      relations: ['categories']
    });

    return createdProduct;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({ name });

    return product;
  }

  async listAll(): Promise<Product[]> {
    const products = await this.repository.find({
      relations: ['categories']
    });

    return products;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne(id, {
      relations: ['categories']
    });

    return product;
  }

  async updateById({
    id,
    name,
    price,
    categories
  }: IUpdateProductDTO): Promise<void> {
    await this.repository.save({
      id,
      name,
      price,
      categories
    });
  }
}
