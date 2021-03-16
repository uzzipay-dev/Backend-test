import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { inject, injectable } from 'tsyringe' 

interface IRequest {
   description: string;
}

@injectable()
class CreateCategoryUseCase {
   constructor(
      @inject("CategoriesRepository")
      private categoriesRepository: ICategoriesRepository
   ){}

   async execute({ description }: IRequest): Promise<void>{
      const categoryAlreadyExists = await this.categoriesRepository.findByName(description)

      if(categoryAlreadyExists){
         throw new Error("Category already exists!")
      }
   
      this.categoriesRepository.create({ description })
   }

}

export { CreateCategoryUseCase }