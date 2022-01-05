import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from '@modules/categories/infra/entities/Category';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'products_categories',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'category_id' }]
  })
  categories: Category[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
