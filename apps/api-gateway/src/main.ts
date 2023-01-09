/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'v1/api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(AppModule.port);
  app.enableCors();

  Logger.log(
    `🚀 Application is running on: http://localhost:${AppModule.port}/${globalPrefix}`
  );
}

bootstrap();
