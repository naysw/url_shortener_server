import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Url } from "@prisma/client";
import { Request } from "express";
import { PrismaService } from "../../../common/prisma.service";
import { UrlShortInput } from "../dto/url-short.input";
import { UrlRepository } from "../repositories/url.repository";

@Injectable()
export class UrlService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly urlRepository: UrlRepository,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async findMany() {
    const urls = await this.urlRepository.findMany();

    return urls.map((url) => this.urlResource(url));
  }

  getRedirectableUrl(urlString: string) {
    // console.log(url.parse())
    return urlString;
  }

  async findByShortCode(shoortCode: string) {
    const url = await this.urlRepository.findByShortCode(shoortCode);

    if (!url)
      throw new NotFoundException(
        `Url with ${JSON.stringify(shoortCode)} not found`,
      );

    return this.urlResource(url);
  }

  async findById(id: string) {
    const url = await this.urlRepository.findById(id);

    if (!url)
      throw new NotFoundException(`Url with ${JSON.stringify(id)} not found`);

    return this.urlResource(url);
  }

  getUrlString(originalUrl: string): string {
    const r = new RegExp("^(?:[a-z+]+:)?//", "i");

    // if (
    //   originalUrl.indexOf("http://") === 0 ||
    //   originalUrl.indexOf("https://") === 0
    // ) {
    //   return `http://${originalUrl}`;
    // }

    return originalUrl;
  }

  async create({
    originalUrl,
    expiredAt,
    userId,
  }: UrlShortInput & { userId?: string }) {
    const url = await this.urlRepository.create(originalUrl, userId);

    return this.urlResource(url);
  }

  private urlResource(url: Url) {
    return {
      ...url,
      link: `${this.req.protocol + "://" + this.req.get("host")}/${
        url.shortCode
      }`,
    };
  }

  async deleteById(id: string) {
    return await this.urlRepository.deleteById(id);
  }
}
