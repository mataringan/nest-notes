import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from "./config/app/config.services";
import { openApiSetup } from "./config/api/openApi.setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get app config for cors settings and starting the app
  const appConfig = app.get(AppConfigService);

  /** * Global Prefix */
  app.setGlobalPrefix('api');

  /** * Set Swagger */
  openApiSetup(app, appConfig);

  /** * Enable Cors */
  app.enableCors()

  await app.listen(appConfig.appPort, appConfig.appHost, () => {
    console.log(`[${appConfig.appName} ${appConfig.appEnv}]`, `//${appConfig.appHost}:${appConfig.appPort}`);
  });
}
bootstrap();
