import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PRIVILEGE_METADATA_KEY } from '../constants/metadata.constants';
import { ErrorMessage } from '../enums/access-control.enums';
import { hasRequiredPrivilegeFromHeaders } from '../utils/access-header.util';

@Injectable()
export class PrivilegesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPrivilege = this.reflector.getAllAndOverride<{
      group: string;
      name: string;
    }>(PRIVILEGE_METADATA_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPrivilege) {
      return true;
    }

    const request = this.getRequest(context);
    const userId = request.headers?.['x-user-id'] || request.userId;

    if (!userId) {
      throw new UnauthorizedException(ErrorMessage.MISSING_USER_ID);
    }

    request.userId = userId;

    const hasPrivilege = hasRequiredPrivilegeFromHeaders(
      request.headers || {},
      requiredPrivilege.group,
      requiredPrivilege.name
    );

    if (!hasPrivilege) {
      throw new ForbiddenException(
        `Access denied. Required privilege: ${requiredPrivilege.group}:${requiredPrivilege.name}`
      );
    }

    return true;
  }

  private getRequest(context: ExecutionContext): any {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    }

    return context.switchToHttp().getRequest();
  }
}
