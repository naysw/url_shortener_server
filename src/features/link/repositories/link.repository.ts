import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../../../common/prisma.service";
import { DEFAULT_TAKE } from "../../../config/constants";
import { registerOrderBy } from "../../../utils/queryBuilder";
import { FindManyLinkInput } from "../dto/find-many-link.input";
import { UrlShortInput } from "../dto/url-short.input";

@Injectable()
export class LinkRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany({ take, skip, keyword, orderBy }: FindManyLinkInput) {
    try {
      return await this.prismaService.link.findMany({
        where: {
          OR: keyword && [
            {
              fullUrl: {
                contains: String(keyword) || undefined,
              },
            },
          ],
        },
        take: Number(take) || DEFAULT_TAKE,
        skip: Number(skip) || undefined,
        include: {
          visits: true,
        },
        orderBy: registerOrderBy(orderBy),
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByShortCode(shortCode: string) {
    try {
      return await this.prismaService.link.findUnique({
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
      return await this.prismaService.link.findUnique({
        where: {
          id,
        },
        include: {
          visits: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("DB error");
    }
  }

  async create({
    fullUrl,
    expiredAt,
    userId,
  }: UrlShortInput & { userId?: string }) {
    try {
      return await this.prismaService.link.create({
        data: {
          fullUrl,
          expiredAt,
          shortCode: cuid.slug(),
          user: userId
            ? {
                connect: {
                  id: userId,
                },
              }
            : undefined,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error Occoured on : create Url");
    }
  }

  async deleteById(id: string) {
    try {
      return await this.prismaService.link.delete({
        where: {
          id,
        },
      });
    } catch (error) {}
  }
}
