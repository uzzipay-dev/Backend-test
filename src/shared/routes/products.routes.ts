import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController';
import { ListCategoriesByProductController } from '@modules/products/useCases/ListCategoriesByProduct/ListCategoriesByProductController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();
const listCategoriesByProductController =
  new ListCategoriesByProductController();

const productsRouter = Router();

productsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createProductController.handle
);

productsRouter.get('/', listProductsController.handle);

productsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteProductController.handle
);

productsRouter.patch(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateProductController.handle
);

productsRouter.post('/:id', listCategoriesByProductController.handle);

export { productsRouter };
