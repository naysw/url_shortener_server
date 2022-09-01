import { Module } from "@nestjs/common";
import { RoleRepository } from "./repositories/role.repository";
import { RoleService } from "./services/role.service";

@Module({
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
