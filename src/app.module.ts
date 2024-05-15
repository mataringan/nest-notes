import { Module } from '@nestjs/common';
import { AppConfigModule } from "./config/app/config.module";
import { DatabasePostgresConfigModule } from "./config/database/postgres/config.module";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";
import { UsersModule } from "./models/users/users.module";
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  imports: [
    // Config
    AppConfigModule,
    DatabasePostgresConfigModule,
    // Providers
    PostgresDatabaseProviderModule,

    // Models
    UsersModule,

    AuthenticationModule
  ]
})
export class AppModule {}
