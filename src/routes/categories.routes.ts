import { request, response, Router } from 'express'
import { CategoriesRepository } from '../modules/products/repositories/implementation/CategoriesRepository'
import { CreateCategoryController } from '../modules/products/useCases/createCategory/CreateCategoryController'
import { listCategoriesController } from '../modules/products/useCases/listCategories'


const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", (request, response) => {
   return listCategoriesController.handle(request, response)
})

export { categoriesRoutes }