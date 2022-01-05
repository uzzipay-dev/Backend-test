import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/categories/useCases/deleteCategory/DeleteCategoryController';
import { ListCategoriesController } from '@modules/categories/useCases/listCategories/ListCategoriesController';
import { ListProductsByCategoryController } from '@modules/categories/useCases/ListProductsByCategory/ListProductsByCategoryController';
import { UpdateCategoryController } from '@modules/categories/useCases/updateCategory/UpdateCategoryController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createCategoriesController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();
const listProductsByCategoryController = new ListProductsByCategoryController();

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

categoriesRouter.patch(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateCategoryController.handle
);

categoriesRouter.post('/:id', listProductsByCategoryController.handle);

export { categoriesRouter };
