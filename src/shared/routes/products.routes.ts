import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { ensureAdmin } from '@shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';

const createProductController = new CreateProductController();

const productsRouter = Router();

productsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createProductController.handle
);

export { productsRouter };
