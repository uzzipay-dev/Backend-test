import { Category } from "../entities/Category";

interface ICreateCategoryDTO{
   description: string
}

interface ICategoriesRepository {
   findByName(description: string): Promise<Category>
   list(): Promise<Category[]>
   create({ description }: ICreateCategoryDTO): void
}

export { ICategoriesRepository, ICreateCategoryDTO }