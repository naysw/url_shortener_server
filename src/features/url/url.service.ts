import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class UrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(fullUrl: string, userId?: string) {
    try {
      return await this.prismaService.url.create({
        data: {
          fullUrl,
          shortCode: cuid.slug(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error Occoured on : create Url");
    }
  }
}
