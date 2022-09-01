import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { UrlModule } from "./features/url/url.module";

@Module({
  imports: [UrlModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
