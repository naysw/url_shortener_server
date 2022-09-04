import { Module } from "@nestjs/common";
import { BlackListUrlService } from "./black-list-url.service";

@Module({
  providers: [BlackListUrlService],
  exports: [BlackListUrlService],
})
export class BlackListUrlModule {
  //
}
