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
import { JoiValidationPipe } from "../../../pipe/joi-validation.pipe";
import { AuthUser } from "../../auth/decorators/auth-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BlackListUrlService } from "../../black-list-url/black-list-url.service";
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
  constructor(
    private readonly linkService: LinkService,
    private readonly blackListUrl: BlackListUrlService,
  ) {}

  @Get()
  async findManyLink(
    @Query(new JoiValidationPipe(findManyLinkInputSchema))
    { take, skip, keyword }: FindManyLinkInput,
  ) {
    const links = await this.linkService.findMany({ take, skip, keyword });

    return new ResponseResource(links);
  }

  @Get("/me")
  async meLinks() {
    const links = await this.linkService.findMany({});

    return new ResponseResource(links);
  }

  @Post("/short")
  @UseGuards(JwtAuthGuard)
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { fullUrl, expiredAt }: UrlShortInput,
    @AuthUser() authUser: User,
  ) {
    await this.blackListUrl.checkBlackListUrl(fullUrl);

    const url = await this.linkService.create({
      fullUrl: this.linkService.getUrlString(fullUrl),
      expiredAt,
      userId: authUser.id,
    });

    return new ResponseResource(url).setMessage("Url short successfully");
  }

  @Delete(":id")
  async deleteUrl(@Param("id") id: string) {
    await this.linkService.findById(id);

    await this.linkService.deleteById(id);

    return new ResponseResource(null).setMessage(
      `Url with ${JSON.stringify(id)} deleted successfully`,
    );
  }
}
