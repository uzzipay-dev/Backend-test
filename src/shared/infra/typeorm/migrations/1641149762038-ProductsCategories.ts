import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductsCategories1641149762038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_categories',
        columns: [
          {
            name: 'product_id',
            type: 'uuid'
          },
          {
            name: 'category_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKCategory',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_categories');
  }
}
