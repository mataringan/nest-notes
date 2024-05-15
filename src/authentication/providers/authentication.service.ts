import * as bcrypt from "bcrypt";

import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../models/users/providers/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../models/users/entities/user.entity";
import { ILogin } from "../interfaces/login.interface";
import { RegisterDto } from "../dto/register-email.dto";
import { SALT_OR_ROUND } from "../constants/bcrypt.constants";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../models/users/dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User>{
    const user = await this.userService.findOneByEmail(email)
    if (!user) return null

    const isMatch = await bcrypt.compare(`${password}`, user.password);
    if(!isMatch) return null;

    return user
  }

  async login(payload:LoginDto): Promise<ILogin>{
    const user = await this.validateUser(payload.email, payload.password)
    if(!user){
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.jwtService.sign({ email: user.email, name: user.name });
    return {
      accessToken
    }
  }

  async register(payload:RegisterDto):Promise<User>{
    try {
      const emailExist = await this.userService.findOneByEmail(payload.email)

      if(emailExist){
        throw new BadRequestException(`Users with email ${payload.email} already exists`)
      }

      //** * Hash Password */
      const saltorRounds = SALT_OR_ROUND
      const passHash = await bcrypt.hash(payload.password, saltorRounds)

      // const register = await this.userRepository.create({
      //   ...payload,
      //   password: passHash
      // })
      //
      // const result = await this.userRepository.save(register)
      //
      // return  result

      return await this.userService.create({
        ...payload,
        password: passHash
      })
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
