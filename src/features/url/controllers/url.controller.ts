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
  FindManyUrlInput,
  findManyUrlInputSchema,
} from "../dto/find-many-url.input";
import { UrlShortInput, urlShortInputSchema } from "../dto/url-short.input";
import { UrlService } from "../services/url.service";

@Controller({
  path: "api/url",
})
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly blackListUrl: BlackListUrlService,
  ) {}

  @Get()
  async findManyUrl(
    @Query(new JoiValidationPipe(findManyUrlInputSchema))
    { take, skip }: FindManyUrlInput,
  ) {
    const urls = await this.urlService.findMany({ take, skip });

    return new ResponseResource(urls);
  }

  @Post("/short")
  @UseGuards(JwtAuthGuard)
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { originalUrl, expiredAt }: UrlShortInput,
    @AuthUser() authUser: User,
  ) {
    await this.blackListUrl.checkBlackListUrl(originalUrl);

    const url = await this.urlService.create({
      originalUrl: this.urlService.getUrlString(originalUrl),
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
