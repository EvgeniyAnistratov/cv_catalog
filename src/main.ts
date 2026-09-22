import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ApplicationConfig } from "./infra/config/app.env";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService<ApplicationConfig>>(ConfigService);
    const listenPort = configService.get("APP_LISTEN_PORT", { infer: true }) || 3000;
    const listenHost = configService.get("APP_LISTEN_HOST", { infer: true }) || "0.0.0.0";

    await app.listen(listenPort, listenHost);
}

await bootstrap();
