import { request, response, Router } from "express";
import { createProductController } from "../modules/products/useCases/createProduct";
import { listProductsController } from "../modules/products/useCases/listProducts";


const productsRoutes = Router()


productsRoutes.post("/", (request, response) =>{
   return createProductController.handle(request, response)
   
})

productsRoutes.get("/", (request, response) => {
   return listProductsController.handle(request, response)
})

export { productsRoutes }