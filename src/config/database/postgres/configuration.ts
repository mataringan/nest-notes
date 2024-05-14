import { registerAs } from '@nestjs/config';

export default registerAs('databasePostgres', () => ({
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbPort: process.env.DATABASE_PORT,
    dbSync: process.env.DATABASE_SYNCHRONIZE,
    dbSchema: process.env.DATABASE_SCHEMA,
    dbLogging: process.env.DATABASE_LOGGING,
}));
