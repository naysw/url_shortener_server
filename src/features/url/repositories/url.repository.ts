import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma.service";

@Injectable()
export class UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByShortCode(shortCode: string) {
    try {
      return await this.prismaService.url.findUnique({
        where: {
          shortCode,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("DB error");
    }
  }
}
