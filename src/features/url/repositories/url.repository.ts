import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../../../common/prisma.service";

@Injectable()
export class UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    try {
      return await this.prismaService.url.findMany({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

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

  async findById(id: string) {
    try {
      return await this.prismaService.url.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("DB error");
    }
  }

  async create(originalUrl: string, userId?: string) {
    try {
      return await this.prismaService.url.create({
        data: {
          originalUrl,
          shortCode: cuid.slug(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error Occoured on : create Url");
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prismaService.url.delete({
        where: {
          id,
        },
      });
    } catch (error) {}
  }
}
