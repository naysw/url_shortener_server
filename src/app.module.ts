import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { CommonModule } from "./common/common.module";
import { AppController } from "./controllers/app.controller";
import { AuthModule } from "./features/auth/auth.module";
import { LinkModule } from "./features/link/link.module";
import { VisitRepository } from "./repositories/visit.repository";
import { AppService } from "./services/app.service";
import { VisitService } from "./services/visit.service";

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   exclude: ["/api*"],
    // }),
    CacheModule.register(),
    LinkModule,
    CommonModule,
    EventEmitterModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    VisitService,
    VisitRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
