import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, categories_ids } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const updatedProduct = await updateProductUseCase.execute({
      id,
      name,
      price,
      categories_ids
    });

    return response.status(201).json(updatedProduct);
  }
}
