import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = { name };

    const createdCategory = await createCategoryUseCase.execute(category);

    return response.status(201).json(createdCategory);
  }
}
