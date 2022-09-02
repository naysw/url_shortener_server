import { Module } from "@nestjs/common";
import { VisitRepository } from "../../repositories/visit.repository";
import { VisitService } from "../../services/visit.service";
import { BlackListUrlModule } from "../black-list-url/black-list-url.module";
import { UrlController } from "./controllers/url.controller";
import { UrlListener } from "./listeners/url.listener";
import { UrlRepository } from "./repositories/url.repository";
import { UrlService } from "./services/url.service";

@Module({
  imports: [BlackListUrlModule],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository,
    UrlListener,
    VisitService,
    VisitRepository,
  ],
  exports: [UrlService],
})
export class UrlModule {}
