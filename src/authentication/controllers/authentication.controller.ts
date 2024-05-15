import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticationService } from '../providers/authentication.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../../models/users/entities/user.entity";
import { RegisterDto } from "../dto/register-email.dto";
import { ApiBaseResponse } from "../../common/decorators/api-base-response.decorator";
import { LoginDto } from "../dto/login.dto";
import { UsersService } from "../../models/users/providers/users.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService, private usersService: UsersService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login with email'
  })
  @ApiBaseResponse(LoginDto)
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register with email',
  })
  @ApiBaseResponse(User)
  create(@Body() body: RegisterDto){
    return this.authenticationService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get profile'
  })
  @ApiBaseResponse(User)
  getProfile(@Req() req: any){
    return this.usersService.getProfile(req.user.id)
  }
}
