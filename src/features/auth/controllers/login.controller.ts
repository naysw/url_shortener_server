import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ResponseResource } from "src/common/resources/response.resource";
import { JoiValidationPipe } from "src/pipe/joi-validation.pipe";
import { UserService } from "../../users/services/user.service";
import { LoginInput, loginInputSchema } from "../input/login.input";

@Controller({
  path: "/api/auth",
  version: "1",
})
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * handle login request
   *
   * @param input LoginInput
   * @return Promise<ResponseResource<{ token: string }>>
   */
  @Post("/login")
  async login(
    @Body(new JoiValidationPipe(loginInputSchema))
    { username, password }: LoginInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseResource<{ token: string }>> {
    const user = await this.userService.findByUsername(username);

    if (!user)
      throw new UnauthorizedException("Username or password is incorrect");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException("Username or password is incorrect");
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    res.cookie("authorization", `Bearer ${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return new ResponseResource({ token });
  }
}
