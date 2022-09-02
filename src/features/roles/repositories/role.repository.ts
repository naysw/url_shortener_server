import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma.service";
import { IS_DEV } from "../../../config/constants";

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * find role by id
   *
   * @param id string
   * @returns
   */
  async findById(id: string) {
    try {
      return await this.prismaService.role.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "findById service error",
      );
    }
  }
}
