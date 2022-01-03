import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsByCategoryUseCase } from './ListProductsByCategoryUseCase';

export class ListProductsByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProductsByCategoryUseCase = container.resolve(
      ListProductsByCategoryUseCase
    );

    const category = await listProductsByCategoryUseCase.execute(id);

    return response.status(200).json(category);
  }
}
