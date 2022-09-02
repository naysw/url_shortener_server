import { Module } from "@nestjs/common";
import { VisitRepository } from "../../repositories/visit.repository";
import { VisitService } from "../../services/visit.service";
import { BlackListUrlModule } from "../black-list-url/black-list-url.module";
import { LinkController } from "./controllers/link.controller";
import { UrlListener } from "./listeners/url.listener";
import { UrlRepository } from "./repositories/url.repository";
import { LinkService } from "./services/link.service";

@Module({
  imports: [BlackListUrlModule],
  controllers: [LinkController],
  providers: [
    LinkService,
    UrlRepository,
    UrlListener,
    VisitService,
    VisitRepository,
  ],
  exports: [LinkService],
})
export class LinkModule {}
