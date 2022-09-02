import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class VisitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(urlId: string, ip: string) {
    try {
      return await this.prismaService.visit.create({
        data: {
          url: {
            connect: {
              id: urlId,
            },
          },
          ip,
        },
      });
    } catch (error) {}
  }
}
