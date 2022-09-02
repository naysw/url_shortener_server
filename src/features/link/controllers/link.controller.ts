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
  path: "api/url",
})
export class LinkController {
  constructor(
    private readonly urlService: LinkService,
    private readonly blackListUrl: BlackListUrlService,
  ) {}

  @Get()
  async findManyLink(
    @Query(new JoiValidationPipe(findManyLinkInputSchema))
    { take, skip }: FindManyLinkInput,
  ) {
    const urls = await this.urlService.findMany({ take, skip });

    return new ResponseResource(urls);
  }

  @Post("/short")
  @UseGuards(JwtAuthGuard)
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { fullUrl, expiredAt }: UrlShortInput,
    @AuthUser() authUser: User,
  ) {
    await this.blackListUrl.checkBlackListUrl(fullUrl);

    const url = await this.urlService.create({
      fullUrl: this.urlService.getUrlString(fullUrl),
      expiredAt,
    });

    return new ResponseResource(url).setMessage("Url short successfully");
  }

  @Delete(":id")
  async deleteUrl(@Param("id") id: string) {
    await this.urlService.findById(id);

    await this.urlService.deleteById(id);

    return new ResponseResource(null).setMessage(
      `Url with ${JSON.stringify(id)} deleted successfully`,
    );
  }
}
