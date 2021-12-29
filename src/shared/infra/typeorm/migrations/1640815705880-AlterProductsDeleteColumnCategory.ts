import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterProductsDeleteColumnCategory1640815705880
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'category');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({ name: 'category', type: 'varchar' })
    );
  }
}
