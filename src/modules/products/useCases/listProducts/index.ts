import { ProductsRepository } from "../../repositories/implementation/ProductsRepository";
import { ListProductsController } from "./ListProductsController";
import { ListProductsUseCase } from "./ListProductsUseCase";

const productRepository =  ProductsRepository.getInstance()
const listProductsUseCase = new ListProductsUseCase(productRepository)
const listProductsController = new ListProductsController(listProductsUseCase)

export { listProductsController }