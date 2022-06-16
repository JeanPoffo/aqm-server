import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Data1654970477544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'data',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'data_raw_id',
            type: 'uuid',
          },
          {
            name: 'particulate_material_two_five',
            type: 'numeric',
          },
          {
            name: 'particulate_material_ten',
            type: 'numeric',
          },
          {
            name: 'carbon_monoxide',
            type: 'numeric',
          },
          {
            name: 'sulfur_dioxide',
            type: 'numeric',
          },
          {
            name: 'nitrogen_dioxide',
            type: 'numeric',
          },
          {
            name: 'ozone',
            type: 'numeric',
          },
          {
            name: 'temperature',
            type: 'numeric',
          },
          {
            name: 'humidity',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'data',
      new TableForeignKey({
        columnNames: ['data_raw_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'data_raw',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('data');
  }
}
