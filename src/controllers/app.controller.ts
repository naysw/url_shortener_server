import { Controller, Get, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Request, Response } from "express";
import { UrlVisitedEvent } from "../features/url/events/url-visited.event";
import { UrlService } from "../features/url/services/url.service";
import { AppService } from "../services/app.service";
import { VisitService } from "../services/visit.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
    private readonly visitService: VisitService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(":shortCode")
  async getLink(
    @Param("shortCode") shortCode: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    /**
     * first we look url table with shortCode from given param,
     * if we do not found record `findByShortCode` will throw NotFoundException
     */
    const url = await this.urlService.findByShortCode(shortCode);

    /**
     * after we
     */
    this.eventEmitter.emit("url.visited", new UrlVisitedEvent(url.id, req.ip));

    /**
     * we set `302 status code` and redirect to url
     */
    return res.redirect(
      HttpStatus.FOUND,

      /**
       * to redirect to external url, the url should start with valid
       * protocol, otherwise it will redirect internal server path
       */
      this.urlService.getRedirectableUrl(url.originalUrl),
    );
  }
}
