import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { VisitService } from "../../../services/visit.service";
import { UrlVisitedEvent } from "../events/url-visited.event";

@Injectable()
export class UrlListener {
  constructor(private readonly visitService: VisitService) {}

  /**
   * listen `url.visited` event and
   * create visit record with associated link
   *
   * @param event UrlVisitedEvent
   * @return Promise<void>
   */
  @OnEvent("url.visited", { async: true })
  async handleUrlVisitedEvent(event: UrlVisitedEvent): Promise<void> {
    await this.visitService.create(event.urlId, event.ip);
  }
}
