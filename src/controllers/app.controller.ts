import {
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Request, Response } from "express";
import { UrlVisitedEvent } from "../features/link/events/url-visited.event";
import { LinkService } from "../features/link/services/link.service";

@Controller()
export class AppController {
  constructor(
    private readonly linkService: LinkService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * get link by shortcode
   *
   * @param shortCode string
   * @param req Request
   * @param res Response
   * @returns Promise<void>
   */
  @Get(":shortCode")
  @UseInterceptors(CacheInterceptor)
  async getLink(
    @Param("shortCode") shortCode: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    /**
     * first we look url table with shortCode from given param,
     * if we do not found record `findByShortCode` will throw NotFoundException
     */
    const url = await this.linkService.findByShortCode(shortCode);

    /**
     * check given link is expired or not,
     * if expired, it will throw `GoneException`
     */
    this.linkService.checkExpiration(url.expiredAt);

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
      this.linkService.getRedirectableUrl(url.fullUrl),
    );
  }
}
