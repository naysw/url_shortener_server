import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";
import { ACCESS_TOKEN_SECRET, TOKEN_EXPIRES_IN } from "./config/auth";
import { LoginController } from "./controllers/login.controller";
import { JwtStrategy } from "./jwt-strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: TOKEN_EXPIRES_IN,
      },
    }),
    UserModule,
  ],
  controllers: [LoginController],
  providers: [JwtStrategy],
})
export class AuthModule {}
