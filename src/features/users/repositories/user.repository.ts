import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma.service";
import { IS_DEV } from "../../../config/constants";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * find user by unique
   *
   * @param input
   * @returns
   */
  async findByUsername(username: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          username,
        },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `user findUnique error: ${IS_DEV && error}`,
      );
    }
  }
}
