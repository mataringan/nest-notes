import { Module } from '@nestjs/common';
import { AppConfigModule } from "./config/app/config.module";
import { DatabasePostgresConfigModule } from "./config/database/postgres/config.module";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";
import { UsersModule } from "./models/users/users.module";
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from "@nestjs/core";
import { RoleGuard } from "./common/guards/role.guard";
import { AuditLogsModule } from "./models/audit-logs/audit-logs.module";


@Module({
  imports: [
    // Config
    AppConfigModule,
    DatabasePostgresConfigModule,

    // Providers
    PostgresDatabaseProviderModule,

    // Authentication
    AuthenticationModule,

    // Models
    AuditLogsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ]
})
export class AppModule {}
