import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Product } from '@modules/products/infra/entities/Product';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'products_categories',
    joinColumns: [{ name: 'category_id' }],
    inverseJoinColumns: [{ name: 'product_id' }]
  })
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
