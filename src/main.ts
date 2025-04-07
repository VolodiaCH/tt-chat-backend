import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  /*
  app.enableCors({
    origin: process.env.FRONTED_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  */

  app.enableCors({ origin: '*' });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
