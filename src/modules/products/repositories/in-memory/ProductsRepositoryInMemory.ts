import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO';
import { Product } from '@modules/products/infra/entities/Product';

import { IProductsRepository } from '../IProductsRespository';

export class ProductsRepositoryInMemory implements IProductsRepository {
  products: Product[] = [];

  async create({ name, price }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      price
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find(product => product.name === name);
  }

  async listAll(): Promise<Product[]> {
    const allProducts = this.products;

    return allProducts;
  }

  async deleteById(id: string): Promise<void> {
    const product = this.products.find(product => product.id === id);
    this.products.splice(this.products.indexOf(product));
  }

  async findById(id: string): Promise<Product> {
    return this.products.find(product => product.id === id);
  }

  async updateById({ id, name, price }: IUpdateProductDTO): Promise<void> {
    const product = this.products.find(product => product.id === id);
    this.products.splice(this.products.indexOf(product));

    Object.assign(product, {
      name,
      price
    });

    this.products.push(product);
  }
}
