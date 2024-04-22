import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(
    new ValidationPipe({
      //conf para que no manden propiedades que no son
      whitelist:true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true
      // }
    })
  );
  console.log(process.env.PORT)
  await app.listen(process.env.PORT);
  
}
bootstrap();
