import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * get current authenticated user from context
 *
 */
export const AuthUser = createParamDecorator((data, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});
