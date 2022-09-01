import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class BlackListUrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkBlackListUrl(url: string) {
    const blackListUrl = await this.findByUrl(url);

    if (blackListUrl)
      throw new BadRequestException(
        `Sorry! URL with ${JSON.stringify(
          url,
        )} is not allowed, please try another one`,
      );
  }

  async findByUrl(url: string) {
    try {
      return await this.prismaService.blackListUrl.findUnique({
        where: {
          url,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error Occured: on blackListUrl find By Id',
      );
    }
  }
}
