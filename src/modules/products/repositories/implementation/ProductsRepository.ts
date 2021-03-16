import { Product } from "../../entities/Product";
import { ICreateProductsDTO, IProductsRepository } from "../IProductsRepository";

class ProductsRepository implements IProductsRepository{
   private products: Product[] = []

   private static INSTANCE: ProductsRepository

   private constructor(){
      this.products = []
   }
   
   public static getInstance(): ProductsRepository{
      if (!ProductsRepository.INSTANCE){
         ProductsRepository.INSTANCE = new ProductsRepository()
      }
      return ProductsRepository.INSTANCE
   }

   list(): Product[] {
      return this.products
   }
   create({ description, price }: ICreateProductsDTO): void {
      const product = new Product()

      Object.assign(product, {
         description,
         price
      })
      this.products.push(product)
   }



}

export { ProductsRepository}