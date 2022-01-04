import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import swagger from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';
import { router } from '@shared/routes';

import swaggerFile from './swagger.json';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());

app.use('/docs', swagger.serve, swagger.setup(swaggerFile));

app.use('/api/v1', router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    });
  }
);

export { app };
