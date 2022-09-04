import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { BlackListUrl } from "@prisma/client";
import { PrismaService } from "../../common/prisma.service";
import { IS_DEV } from "../../config/constants";

@Injectable()
export class BlackListUrlService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * check given url is blacklist or not,
   * if yes, we throw `BadRequestException` and return void
   *
   * @param url string
   * @return Promise<void>
   */
  async checkBlackListUrl(url: string): Promise<void> {
    const blackListUrl = await this.findByUrl(url);

    if (blackListUrl)
      throw new BadRequestException(
        `Sorry! URL with ${JSON.stringify(
          url,
        )} is not allowed, please try another one`,
      );
  }

  /**
   * find all visit record with url
   * @param url string
   * @returns Promise<BlackList>
   */
  async findByUrl(url: string): Promise<BlackListUrl> {
    try {
      return await this.prismaService.blackListUrl.findUnique({
        where: {
          url,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        IS_DEV ? error : "Error Occured: on blackListUrl find By Id",
      );
    }
  }
}
