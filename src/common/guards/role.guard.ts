import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private refector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.refector.get(Roles, context.getHandler());
    if(!roles){
      return true;
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(context.switchToHttp().getRequest());

    const encodedPayload = token.split('.')[1];
    const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
    const payload = JSON.parse(decodedPayload);

    const userRole = payload.role;
    console.log('pppp', payload.role)

    if (roles.includes(userRole)) {
      return true;
    } else {
      throw new ForbiddenException('Forbidden resource');
    }
  }
}