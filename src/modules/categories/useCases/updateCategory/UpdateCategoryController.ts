import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';

export class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

    const updatedCategory = await updateCategoryUseCase.execute({ id, name });

    return response.status(201).json(updatedCategory);
  }
}
