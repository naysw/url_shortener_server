import { Body, Controller, Post } from "@nestjs/common";
import { JoiValidationPipe } from "src/pipe/joi-validation.pipe";
import { BlackListUrlService } from "../black-list-url/black-list-url.service";
import { UrlShortInput, urlShortInputSchema } from "./dto/url-short.input";
import { UrlService } from "./url.service";

@Controller({
  path: "url",
})
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly blackListUrl: BlackListUrlService,
  ) {}

  @Post("/short")
  async makeShort(
    @Body(new JoiValidationPipe(urlShortInputSchema))
    { fullUrl }: UrlShortInput,
  ) {
    await this.blackListUrl.checkBlackListUrl(fullUrl);

    return await this.urlService.create(fullUrl);
  }
}
