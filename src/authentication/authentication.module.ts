import { Module } from '@nestjs/common';
import { AuthenticationService } from './providers/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { UsersModule } from "../models/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigModule } from "../config/jwt/config.module";
import { JwtConfigService } from "../config/jwt/config.services";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
  imports: [
    JwtConfigModule,
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (configService: JwtConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExp,
          issuer: configService.jwtIssuer,
        }
      }),
      inject: [JwtConfigService]
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
