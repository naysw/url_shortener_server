import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import cors from "./config/cors";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(cors);
  app.setGlobalPrefix("api");
  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, async () => {
    console.log(`Server is running on ${await app.getUrl()}`);
  });
})();
