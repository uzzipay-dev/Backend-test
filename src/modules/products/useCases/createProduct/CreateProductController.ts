import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, categories_ids } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      name,
      price,
      categories_ids
    });

    return response.status(201).json(product);
  }
}
