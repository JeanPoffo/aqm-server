import { DataSource } from 'typeorm';

const aqmDataSouce = new DataSource({
  type: 'postgres',
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  username: String(process.env.DATABASE_USERNAME),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_DATABASE),
  synchronize: true,
  logging: false,
  migrationsRun: true,
  ssl: String(process.env.DATABASE_SSL) === 'true' ? { rejectUnauthorized: false } : false,
  entities: [String(process.env.DATABASE_ENTITIES)],
  migrations: [String(process.env.DATABASE_MIGRATIONS)],
});

export { aqmDataSouce };
