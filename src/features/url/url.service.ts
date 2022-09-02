import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import cuid from "cuid";
import { PrismaService } from "../../common/prisma.service";
import { UrlRepository } from "./repositories/url.repository";

@Injectable()
export class UrlService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly urlRepository: UrlRepository,
  ) {}

  getRedirectableUrl(urlString: string) {
    return urlString;
  }

  async findByShortCode(shoortCode: string) {
    const url = await this.urlRepository.findByShortCode(shoortCode);

    if (!url)
      throw new NotFoundException(
        `Url with ${JSON.stringify(shoortCode)} not found`,
      );

    return url;
  }

  getUrlString(originalUrl: string): string {
    const r = new RegExp("^(?:[a-z+]+:)?//", "i");

    if (
      originalUrl.indexOf("http://") === 0 ||
      originalUrl.indexOf("https://") === 0
    ) {
      return `http://${originalUrl}`;
    }

    return originalUrl;
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
}
