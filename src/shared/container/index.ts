import { container } from 'tsyringe'
import { ICategoriesRepository } from '../../modules/products/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/products/repositories/implementation/CategoriesRepository'


container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository
)