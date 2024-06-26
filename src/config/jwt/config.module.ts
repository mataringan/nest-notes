import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { JwtConfigService } from "./config.services";

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService]
})

export class JwtConfigModule{}