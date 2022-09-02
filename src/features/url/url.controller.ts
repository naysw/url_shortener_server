import { Body, Controller, Post } from "@nestjs/common";
import { ResponseResource } from "../../common/resources/response.resource";
import { JoiValidationPipe } from "../../pipe/joi-validation.pipe";
import { BlackListUrlService } from "../black-list-url/black-list-url.service";
import { UrlShortInput, urlShortInputSchema } from "./dto/url-short.input";
import { UrlService } from "./url.service";

@Controller({
  path: "api/url",
})
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly blackListUrl: BlackListUrlService,
  ) {}

  @Post("/short")
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { originalUrl }: UrlShortInput,
  ) {
    await this.blackListUrl.checkBlackListUrl(originalUrl);

    const url = await this.urlService.create(
      this.urlService.getUrlString(originalUrl),
    );

    return new ResponseResource(url).setMessage("Url short successfully");
  }
}
