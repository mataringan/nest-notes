import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfigService } from "../../config/jwt/config.services";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.jwtSecret
    });
  }

  async validate(payload:any){
    return { id: payload.sub, name: payload.name}
  }
}