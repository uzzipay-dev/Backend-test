import { Product } from "../../entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

class ListProductsUseCase {
   constructor (private productRepository: IProductsRepository){}

   execute(): Product[] {
      const product = this.productRepository.list();
      return product
   }
}

export { ListProductsUseCase }