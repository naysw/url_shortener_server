import {
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Link } from "@prisma/client";
import { Request } from "express";
import { PrismaService } from "../../../common/prisma.service";
import { FindManyLinkInput } from "../dto/find-many-link.input";
import { UrlShortInput } from "../dto/url-short.input";
import { LinkRepository } from "../repositories/link.repository";

@Injectable()
export class LinkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly urlRepository: LinkRepository,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async findMany({ take, skip, keyword, orderBy }: FindManyLinkInput) {
    const urls = await this.urlRepository.findMany({
      take,
      skip,
      keyword,
      orderBy,
    });

    return urls.map((url) => this.urlResource(url));
  }

  getRedirectableUrl(urlString: string) {
    // console.log(url.parse())
    return urlString;
  }

  checkExpiration(expiredAt: Date) {
    if (!expiredAt) return;

    const now = new Date(Date.now());

    console.log("expiredAt", expiredAt);
    console.log("now", now);

    if (expiredAt <= now) throw new GoneException(`Link is expired`);
  }

  /**
   * find link by shortCode and return `GoneException, 410` if record not found
   *
   * @param shoortCode string
   * @returns
   */
  async findByShortCode(shoortCode: string) {
    const url = await this.urlRepository.findByShortCode(shoortCode);

    if (!url)
      throw new GoneException(
        `Url with ${JSON.stringify(shoortCode)} not found or deleted`,
      );

    return this.urlResource(url);
  }

  async findById(id: string) {
    const url = await this.urlRepository.findById(id);

    if (!url)
      throw new NotFoundException(`Url with ${JSON.stringify(id)} not found`);

    return this.urlResource(url);
  }

  getUrlString(fullUrl: string): string {
    const r = new RegExp("^(?:[a-z+]+:)?//", "i");

    // if (
    //   fullUrl.indexOf("http://") === 0 ||
    //   fullUrl.indexOf("https://") === 0
    // ) {
    //   return `http://${fullUrl}`;
    // }

    return fullUrl;
  }

  async create({
    fullUrl,
    expiredAt,
    userId,
  }: UrlShortInput & { userId?: string }) {
    const url = await this.urlRepository.create({ fullUrl, expiredAt, userId });

    return this.urlResource(url);
  }

  private urlResource(url: Link) {
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
