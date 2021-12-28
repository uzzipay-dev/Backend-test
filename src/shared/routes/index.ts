import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { categoriesRouter } from './categories.routes';
import { productsRouter } from './products.routes';

const router = Router();

router.use('/session', authenticateRouter);

router.use('/products', productsRouter);

router.use('/categories', categoriesRouter);

export { router };
