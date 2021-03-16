import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController{
   constructor (private createProductUseCase: CreateProductUseCase) {}

   handle(request: Request, response: Response): Response {
      const { description, price } = request.body

      this.createProductUseCase.execute({ description, price })
      return response.status(201).send()
   }
}

export { CreateProductController }