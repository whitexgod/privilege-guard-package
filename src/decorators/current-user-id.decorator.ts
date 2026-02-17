import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.userId || request.headers['x-user-id'];
  }
);
