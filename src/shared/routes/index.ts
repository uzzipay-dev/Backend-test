import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';

const router = Router();

router.use('/session', authenticateRouter);

export { router };
