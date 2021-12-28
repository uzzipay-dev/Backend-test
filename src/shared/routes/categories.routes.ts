import { Router } from 'express';

import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createCategoriesController = new CreateCategoryController();

const categoriesRouter = Router();

categoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoriesController.handle
);

export { categoriesRouter };
