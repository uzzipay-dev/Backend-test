import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { getRepository, Repository } from "typeorm"

class CategoriesRepository implements ICategoriesRepository {
   private repository: Repository<Category> 

   constructor(){
      this.repository = getRepository(Category)
   }


   async create({ description }: ICreateCategoryDTO): Promise<void> {
      const category = this.repository.create({
         description
      })
   
   
      await this.repository.save(category)
   }

   async list(): Promise<Category[]>{
      const categories = await this.repository.find()
      return categories
   }
   
   async findByName(description: string): Promise<Category>{
      const category = await this.repository.findOne({ description })
      return category
   }
}

export { CategoriesRepository }