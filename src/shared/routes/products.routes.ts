import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();

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

export { productsRouter };
