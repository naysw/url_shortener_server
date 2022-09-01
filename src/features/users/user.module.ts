import { Module } from "@nestjs/common";
import { RoleModule } from "../roles/role.module";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";

@Module({
  imports: [RoleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
