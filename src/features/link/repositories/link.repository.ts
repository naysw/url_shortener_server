import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Link } from "@prisma/client";
import cuid from "cuid";
import { PrismaService } from "../../../common/prisma.service";
import { DEFAULT_TAKE, IS_DEV } from "../../../config/constants";
import { registerOrderBy } from "../../../utils/queryBuilder";
import { FindManyLinkInput } from "../dto/find-many-link.input";
import { UrlShortInput } from "../dto/url-short.input";

@Injectable()
export class LinkRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * find many link
   *
   * @param param0 FindManyLinkInput
   * @returns Promise<Link]>
   */
  async findMany({
    take,
    skip,
    keyword,
    orderBy,
  }: FindManyLinkInput): Promise<Link[]> {
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
          _count: true,
          user: true,
        },
        orderBy: registerOrderBy(orderBy),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on findMany Link",
      );
    }
  }

  /**
   * find link by shortcode
   *
   * @param shortCode string
   * @returns Promise<Link>
   */
  async findByShortCode(shortCode: string): Promise<Link> {
    try {
      return await this.prismaService.link.findUnique({
        where: {
          shortCode,
        },
        include: {
          visits: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on findByShortCode",
      );
    }
  }

  /**
   * find link by id
   *
   * @param id string
   * @returns Promise<LInk>
   */
  async findById(id: string): Promise<Link> {
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
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on findById",
      );
    }
  }

  /**
   * create url short
   *
   * @param param0 UrlShortInput
   * @returns Promise<Link>
   */
  async create({
    fullUrl,
    expiredAt,
    userId,
  }: UrlShortInput & { userId?: string }): Promise<Link> {
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
        include: {
          visits: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on create short link",
      );
    }
  }

  /**
   * delete link by id
   *
   * @param id string
   * @returns Promise<Link>
   */
  async deleteById(id: string): Promise<Link> {
    try {
      return await this.prismaService.link.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "DB Error on deleteById",
      );
    }
  }
}
