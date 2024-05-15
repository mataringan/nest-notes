import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthenticationService } from '../providers/authentication.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../../models/users/entities/user.entity";
import { RegisterDto } from "../dto/register-email.dto";
import { ApiBaseResponse } from "../../common/decorators/api-base-response.decorator";
import { LoginDto } from "../dto/login.dto";

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login with email'
  })
  @ApiBaseResponse(LoginDto)
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register with email',
  })
  @ApiBaseResponse(User)
  async create(@Body() body: RegisterDto){
    return this.authenticationService.register(body);
  }
}
