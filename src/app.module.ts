import { Module } from '@nestjs/common';
import { AppConfigModule } from "./config/app/config.module";
import { DatabasePostgresConfigModule } from "./config/database/postgres/config.module";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";


@Module({
  imports: [
    // Config
    AppConfigModule,
    DatabasePostgresConfigModule,
    // Providers
    PostgresDatabaseProviderModule,
  ]
})
export class AppModule {}
