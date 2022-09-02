import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { CommonModule } from "./common/common.module";
import { AppController } from "./controllers/app.controller";
import { UrlModule } from "./features/url/url.module";
import { VisitRepository } from "./repositories/visit.repository";
import { AppService } from "./services/app.service";
import { VisitService } from "./services/visit.service";

@Module({
  imports: [UrlModule, CommonModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, VisitService, VisitRepository],
})
export class AppModule {}
