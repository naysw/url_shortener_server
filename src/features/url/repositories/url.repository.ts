import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../../../common/prisma.service";
import { DEFAULT_TAKE } from "../../../config/constants";
import { FindManyUrlInput } from "../dto/find-many-url.input";

@Injectable()
export class UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany({ take, skip }: FindManyUrlInput) {
    try {
      return await this.prismaService.url.findMany({
        take: Number(take) || DEFAULT_TAKE,
        skip: Number(skip) || undefined,
      });
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
