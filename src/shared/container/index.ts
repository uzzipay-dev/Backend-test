import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CategoriesRepository } from '@modules/products/infra/repositories/CategoriesRepository';
import { ProductsRepository } from '@modules/products/infra/repositories/ProductsRepository';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRespository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
