import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ResponseResource } from "../../../common/resources/response.resource";
import { JwtAuthGuard } from "../../../features/auth/guards/jwt-auth.guard";

@Controller({
  path: "users",
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
  async findMe(@Req() req: any) {
    return new ResponseResource({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      username: req.user.username,
      roles: req.user.roles,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  }
}
