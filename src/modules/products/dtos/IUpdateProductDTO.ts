import { Category } from '@modules/categories/infra/entities/Category';

interface IUpdateProductDTO {
  id?: string;
  name?: string;
  price?: number;
  categories?: Category[];
}

export { IUpdateProductDTO };
