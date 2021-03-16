import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest{
   description: string,
   price: number
}


class CreateProductUseCase {
   constructor(private productsRepository: IProductsRepository){}
   
   execute({ description, price }: IRequest): void{
      this.productsRepository.create({
         description,
         price
      }) 
   }
   
}

export{ CreateProductUseCase }