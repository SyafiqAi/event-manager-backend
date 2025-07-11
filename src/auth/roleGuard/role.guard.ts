import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from 'src/types/auth-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log({ roles });
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as AuthRequest;
    const user = request.user;
    console.log({ user });

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string) {
    return roles.includes(userRole);
  }
}
