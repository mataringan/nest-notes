import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

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
  entities: [__dirname + '/../../../models/**/entities/*.entity{.ts,.js}'],
  seeds: ['src/database/seeders/**/*{.ts,.js}'],
  synchronize: true,
  logging: process.env.dbLogging === 'true',
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions & SeederOptions);
