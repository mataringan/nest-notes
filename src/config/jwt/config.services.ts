import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Service dealing with app config based operations.
 *
 * @class
 */


@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string{
    return this.configService.get<string>('jwt.jwtSecret');
  }
  get jwtExp(): string{
    return this.configService.get<string>('jwt.jwtExp');
  }
  get jwtIssuer(): string{
    return this.configService.get<string>('jwt.jwtIssuer');
  }
}
