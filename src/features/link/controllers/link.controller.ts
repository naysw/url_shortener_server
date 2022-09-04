import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { ResponseResource } from "../../../common/resources/response.resource";
import { AdminGuard } from "../../../features/auth/guards/admin.guard";
import { JoiValidationPipe } from "../../../pipe/joi-validation.pipe";
import { AuthUser } from "../../auth/decorators/auth-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import {
  FindManyLinkInput,
  findManyLinkInputSchema,
} from "../dto/find-many-link.input";
import { UrlShortInput, urlShortInputSchema } from "../dto/url-short.input";
import { LinkService } from "../services/link.service";

@Controller({
  path: "api/links",
})
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  /**
   * find many link
   *
   * @param param0 FindManyLinkInput
   * @returns Promise<Link[]>
   */
  @Get()
  async findManyLink(
    @Query(new JoiValidationPipe(findManyLinkInputSchema))
    { take, skip, keyword, orderBy }: FindManyLinkInput,
  ): Promise<any> {
    const links = await this.linkService.findMany({
      take,
      skip,
      keyword,
      orderBy,
    });

    return new ResponseResource(links);
  }

  /**
   * return auth user links
   *
   * @returns Promise<Link[]>
   */
  @Get("/my-links")
  @UseGuards(JwtAuthGuard)
  async meLinks(@AuthUser() authUser: User): Promise<any> {
    const links = await this.linkService.findMany({
      orderBy: "createdAt=desc",
      userId: authUser.id,
    });

    return new ResponseResource(links);
  }

  /**
   * create short given url
   *
   * @param param0 UrlShortInput
   * @param authUser User
   * @returns Promise<Link>
   */
  @Post("/short")
  @UseGuards(JwtAuthGuard)
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { fullUrl, expiredAt }: UrlShortInput,
    @AuthUser() authUser: User,
  ): Promise<any> {
    await this.linkService.checkValidUrlToCreate(fullUrl);

    const url = await this.linkService.create({
      fullUrl: this.linkService.getUrlString(fullUrl),
      expiredAt,
      userId: authUser.id,
    });

    return new ResponseResource(url).setMessage("Url short successfully");
  }

  /**
   * get link detail by id
   *
   * @param id string
   * @returns Promise<Link>
   */
  @Get(":id")
  async linkDetails(@Param("id") id: string): Promise<any> {
    const link = await this.linkService.findById(id);

    return new ResponseResource(link);
  }

  /**
   * delete link by id
   *
   * @param id string
   * @returns ResponseResource
   */
  @Delete(":id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteUrl(@Param("id") id: string): Promise<ResponseResource> {
    await this.linkService.findById(id);

    await this.linkService.deleteById(id);

    return new ResponseResource(null).setMessage(
      `Url with ${JSON.stringify(id)} deleted successfully`,
    );
  }
}
