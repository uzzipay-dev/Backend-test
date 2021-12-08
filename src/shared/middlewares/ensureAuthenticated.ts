import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Unauthorized', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, auth.secret_token) as IPayload;

    request.user = { id };
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
