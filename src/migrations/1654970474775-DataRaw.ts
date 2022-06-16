import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DataRaw1654970474775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'data_raw',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'station_id',
            type: 'uuid',
          },
          {
            name: 'date_register',
            type: 'timestamp',
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
      'data_raw',
      new TableForeignKey({
        columnNames: ['station_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'station',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('data_raw');
  }
}
