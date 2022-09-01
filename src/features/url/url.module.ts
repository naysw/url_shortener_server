import { Module } from '@nestjs/common';
import { BlackListUrlModule } from '../black-list-url/black-list-url.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [BlackListUrlModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
