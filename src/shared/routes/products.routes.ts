import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

const productsRouter = Router();

productsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createProductController.handle
);

productsRouter.get('/', listProductsController.handle);

export { productsRouter };
