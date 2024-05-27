import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./controllers/users.controller";
import { UserAud } from "./entities/user-aud.entity";
import { UserSubscriber } from "./subscriber/user.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAud])],
  providers: [UsersService, UserSubscriber],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
