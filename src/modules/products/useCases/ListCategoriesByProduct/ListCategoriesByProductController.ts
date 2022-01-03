import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesByProductUseCase } from './ListCategoriesByProductUseCase';

export class ListCategoriesByProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCategoriesByProductUseCase = container.resolve(
      ListCategoriesByProductUseCase
    );

    const product = await listCategoriesByProductUseCase.execute(id);

    return response.status(200).json(product);
  }
}
