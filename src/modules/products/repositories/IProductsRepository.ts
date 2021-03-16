import { Product } from "../entities/Product";

interface ICreateProductsDTO {
   description: string;
   price: number;
}

interface IProductsRepository {
   list(): Product[];
   create({description, price }: ICreateProductsDTO): void 

}

export { IProductsRepository, ICreateProductsDTO }