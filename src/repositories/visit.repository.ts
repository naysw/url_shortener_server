import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Visit } from "@prisma/client";
import { PrismaService } from "../common/prisma.service";
import { IS_DEV } from "../config/constants";

@Injectable()
export class VisitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * create new visit record with url and ip
   *
   * @param urlId string
   * @param ip string
   * @returns Promise<Visit>
   */
  async create(urlId: string, ip: string): Promise<Visit> {
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
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on create visit record",
      );
    }
  }
}
