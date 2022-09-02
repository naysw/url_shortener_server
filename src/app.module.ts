import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { UrlModule } from "./features/url/url.module";
import { VisitRepository } from "./repositories/visit.repository";
import { VisitService } from "./services/visit.service";

@Module({
  imports: [UrlModule, CommonModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, VisitService, VisitRepository],
})
export class AppModule {}
