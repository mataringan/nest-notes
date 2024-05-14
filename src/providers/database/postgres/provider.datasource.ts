import * as dotenv from 'dotenv'
import * as process from 'process'
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { SeederOptions } from "typeorm-extension";

dotenv.config()
export const providerDatasource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  seeds: ['src/database/seeders/**/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.dbLogging === 'true',
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions & SeederOptions);