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
    filter,
    userId,
  }: FindManyLinkInput & { userId?: string }): Promise<Link[]> {
    const urls = await this.urlRepository.findMany({
      take,
      skip,
      keyword,
      orderBy,
      filter,
      userId,
    });

    return urls.map((url) => this.linkResource(url));
  }

  /**
   * get redirectable url else throw error if not valid url
   *
   * @param urlString string
   * @returns string
   */
  public getRedirectableUrl(urlString: string): string {
    this.checkValidUrlToRedirect(urlString);
    // console.log(url.parse())
    return urlString;
  }

  /**
   * check given expiredAt date is less than or equal with now or not,
   * if yes we throw `GoneException` Link is expired
   *
   * @param expiredAt Date
   * @returns void
   */
  checkExpiration(expiredAt: Date): void {
    if (!expiredAt) return;

    const now = new Date(Date.now());

    console.log("expiredAt", expiredAt);
    console.log("now", now);

    if (expiredAt <= now) throw new GoneException(`Link is expired`);
  }

  public checkValidUrlToRedirect(url: string) {
    return true;
  }

  /**
   * find link by shortCode and return `GoneException, 410` if record not found
   *
   * @param shoortCode string
   * @returns
   */
  async findByShortCode(shoortCode: string): Promise<Link> {
    const url = await this.urlRepository.findByShortCode(shoortCode);

    if (!url)
      throw new GoneException(
        `Url with ${JSON.stringify(shoortCode)} not found or deleted`,
      );

    return this.linkResource(url);
  }

  /**
   * find link by id
   *
   * @param id string
   * @returns Promise<Link>
   */
  async findById(id: string): Promise<Link> {
    const url = await this.urlRepository.findById(id);

    if (!url)
      throw new NotFoundException(`Url with ${JSON.stringify(id)} not found`);

    return this.linkResource(url);
  }

  /**
   * check url is start with http || https,
   * if yes, we return origin url else we put valid protocol to url
   *
   * @param fullUrl string
   * @returns string
   */
  public getUrlString(fullUrl: string): string {
    const r = new RegExp("^(?:[a-z+]+:)?//", "i");

    // if (
    //   fullUrl.indexOf("http://") === 0 ||
    //   fullUrl.indexOf("https://") === 0
    // ) {
    //   return `http://${fullUrl}`;
    // }

    return fullUrl;
  }

  /**
   * create new url short
   *
   * @param param0 UrlShortInput
   * @returns Promise<Link>
   */
  async create({
    fullUrl,
    expiredAt,
    userId,
  }: UrlShortInput & { userId?: string }): Promise<Link> {
    const url = await this.urlRepository.create({ fullUrl, expiredAt, userId });

    return this.linkResource(url);
  }

  /**
   * map link resource, we added extra property
   * `shortUrl` alone with Link Model to work with various domain
   *
   * @param link Link
   * @returns
   */
  private linkResource(link: Link): Link & { shortUrl: string } {
    return {
      ...link,
      shortUrl: `${this.req.protocol + "://" + this.req.get("host")}/${
        link.shortCode
      }`,
    };
  }

  /**
   * delete link by id
   *
   * @param id string
   * @returns Promise<Link>
   */
  async deleteById(id: string): Promise<Link> {
    return await this.urlRepository.deleteById(id);
  }
}
