import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'node:process';
config();
export const postgresDataSource = new DataSource({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  type: 'postgres',
  entities: ['src/entity/*.ts'],
  logging: true,
  synchronize: true
});
