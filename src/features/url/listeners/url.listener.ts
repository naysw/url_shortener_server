import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { VisitService } from "../../../services/visit.service";
import { UrlVisitedEvent } from "../events/url-visited.event";

@Injectable()
export class UrlListener {
  constructor(private readonly visitService: VisitService) {}

  @OnEvent("url.visited", { async: true })
  async handleUrlVisitedEvent(event: UrlVisitedEvent) {
    await this.visitService.create(event.urlId, event.ip);
  }
}
