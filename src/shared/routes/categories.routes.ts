import { Router } from 'express';

import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/products/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createCategoriesController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const categoriesRouter = Router();

categoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoriesController.handle
);

categoriesRouter.get('/', listCategoriesController.handle);

export { categoriesRouter };
