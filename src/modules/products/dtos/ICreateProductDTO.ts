import { Category } from '@modules/categories/infra/entities/Category';

interface ICreateProductDTO {
  name: string;
  price: number;
  categories?: Category[];
}

export { ICreateProductDTO };
