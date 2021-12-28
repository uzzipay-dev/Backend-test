import { Router } from 'express';

import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/products/useCases/deleteCategory/DeleteCategoryController';
import { ListCategoriesController } from '@modules/products/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createCategoriesController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

const categoriesRouter = Router();

categoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoriesController.handle
);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCategoryController.handle
);

export { categoriesRouter };
