import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { ResponseResource } from "../../../common/resources/response.resource";
import { JwtAuthGuard } from "../../../features/auth/guards/jwt-auth.guard";
import { AuthUser } from "../../auth/decorators/auth-user.decorator";

@Controller({
  path: "api/users",
})
export class UserController {
  /**
   * find auth user
   *
   * @param req Request
   * @returns
   */
  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@AuthUser() authUser: User & { roles?: any[] }) {
    return new ResponseResource({
      id: authUser.id,
      name: authUser.name,
      username: authUser.username,
      roles: authUser.roles,
      createdAt: authUser.createdAt,
      updatedAt: authUser.updatedAt,
    });
  }
}
