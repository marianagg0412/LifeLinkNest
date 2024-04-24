import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //conf para que no manden propiedades que no son
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true
      // }
    }),
  );

  // main.ts in NestJS
  app.enableCors({
    origin: 'http://localhost:3001', // Adjust depending on your React app's URL
  });

  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
